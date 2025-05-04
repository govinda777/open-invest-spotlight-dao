
import React, { useRef, useEffect } from 'react';
import { Journey, JourneyStep } from '@/journeys/map';
import { ArrowRight } from 'lucide-react';

interface JourneyGraphProps {
  journey: Journey;
  onSelectStep?: (step: JourneyStep) => void;
}

interface NodePosition {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export const JourneyGraph = ({ journey, onSelectStep }: JourneyGraphProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const nodePositions = useRef<NodePosition[]>([]);

  // Organiza as etapas por níveis com base nas dependências
  const organizeStepsByLevels = () => {
    const steps = journey.steps;
    
    // Identificar etapas iniciais (que não são next de ninguém)
    const allNextSteps = steps.flatMap(step => step.nextSteps);
    const initialSteps = steps.filter(step => !allNextSteps.includes(step.id));
    
    // Inicializar com as etapas iniciais
    const levelMap: { [id: string]: number } = {};
    initialSteps.forEach(step => {
      levelMap[step.id] = 0;
    });
    
    // Função para atribuir nível a uma etapa com base em suas dependências
    const assignLevel = (stepId: string, currentLevel: number) => {
      // Se já tem um nível maior atribuído, mantém
      if (levelMap[stepId] !== undefined && levelMap[stepId] >= currentLevel) {
        return;
      }
      
      // Atribui o nível
      levelMap[stepId] = currentLevel;
      
      // Encontra a etapa correspondente
      const step = steps.find(s => s.id === stepId);
      if (!step) return;
      
      // Atribui nível para próximos passos
      step.nextSteps.forEach(nextId => {
        assignLevel(nextId, currentLevel + 1);
      });
    };
    
    // Atribui níveis começando das etapas iniciais
    initialSteps.forEach(step => {
      assignLevel(step.id, 0);
    });
    
    // Agrupar etapas por nível
    const levels: JourneyStep[][] = [];
    Object.entries(levelMap).forEach(([id, level]) => {
      if (!levels[level]) levels[level] = [];
      const step = steps.find(s => s.id === id);
      if (step) levels[level].push(step);
    });
    
    return levels;
  };
  
  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;
    
    // Limpar SVG
    const svg = svgRef.current;
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }
    
    const levels = organizeStepsByLevels();
    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = Math.max(500, levels.length * 150);
    
    // Definir dimensões do SVG
    svg.setAttribute('width', containerWidth.toString());
    svg.setAttribute('height', containerHeight.toString());
    svg.setAttribute('viewBox', `0 0 ${containerWidth} ${containerHeight}`);
    
    const padding = 20;
    const nodeWidth = 180;
    const nodeHeight = 80;
    
    // Criar elementos SVG para cada etapa
    nodePositions.current = [];
    
    levels.forEach((levelSteps, levelIndex) => {
      const levelWidth = containerWidth - (padding * 2);
      const stepWidth = levelWidth / levelSteps.length;
      
      levelSteps.forEach((step, stepIndex) => {
        const x = padding + (stepWidth * stepIndex) + (stepWidth / 2) - (nodeWidth / 2);
        const y = 50 + (levelIndex * 150);
        
        // Registrar posição
        nodePositions.current.push({
          id: step.id,
          x,
          y,
          width: nodeWidth,
          height: nodeHeight
        });
        
        // Criar grupo para o nó
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.classList.add('cursor-pointer');
        g.setAttribute('data-step-id', step.id);
        
        if (onSelectStep) {
          g.onclick = () => onSelectStep(step);
        }
        
        // Criar retângulo
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', x.toString());
        rect.setAttribute('y', y.toString());
        rect.setAttribute('width', nodeWidth.toString());
        rect.setAttribute('height', nodeHeight.toString());
        rect.setAttribute('rx', '8');
        rect.setAttribute('ry', '8');
        rect.setAttribute('fill', step.paywall ? '#f6e05e' : '#f1f5f9');
        rect.setAttribute('stroke', step.paywall ? '#d69e2e' : '#cbd5e1');
        rect.setAttribute('stroke-width', '2');
        
        // Adicionar texto do título
        const title = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        title.setAttribute('x', (x + nodeWidth / 2).toString());
        title.setAttribute('y', (y + 25).toString());
        title.setAttribute('text-anchor', 'middle');
        title.setAttribute('font-weight', 'bold');
        title.setAttribute('font-size', '14');
        title.textContent = step.title;
        
        // Adicionar ID como subtexto
        const id = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        id.setAttribute('x', (x + nodeWidth / 2).toString());
        id.setAttribute('y', (y + 45).toString());
        id.setAttribute('text-anchor', 'middle');
        id.setAttribute('fill', '#64748b');
        id.setAttribute('font-size', '12');
        id.textContent = step.id;
        
        // Adicionar ícone de paywall se necessário
        if (step.paywall) {
          const paywall = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          paywall.setAttribute('x', (x + nodeWidth / 2).toString());
          paywall.setAttribute('y', (y + 65).toString());
          paywall.setAttribute('text-anchor', 'middle');
          paywall.setAttribute('font-size', '12');
          paywall.setAttribute('fill', '#d69e2e');
          paywall.textContent = '🔒 Paywall';
          g.appendChild(paywall);
        }
        
        g.appendChild(rect);
        g.appendChild(title);
        g.appendChild(id);
        
        svg.appendChild(g);
        
        // Evento de hover
        g.onmouseenter = () => {
          rect.setAttribute('stroke', '#3b82f6');
          rect.setAttribute('stroke-width', '3');
          rect.setAttribute('filter', 'drop-shadow(0 4px 3px rgba(0, 0, 0, 0.07))');
        };
        
        g.onmouseleave = () => {
          rect.setAttribute('stroke', step.paywall ? '#d69e2e' : '#cbd5e1');
          rect.setAttribute('stroke-width', '2');
          rect.setAttribute('filter', 'none');
        };
      });
    });
    
    // Desenhar conexões entre os nós
    journey.steps.forEach(step => {
      const sourceNode = nodePositions.current.find(n => n.id === step.id);
      if (!sourceNode) return;
      
      step.nextSteps.forEach(nextId => {
        const targetNode = nodePositions.current.find(n => n.id === nextId);
        if (!targetNode) return;
        
        // Calcular pontos para a linha
        const startX = sourceNode.x + sourceNode.width / 2;
        const startY = sourceNode.y + sourceNode.height;
        
        const endX = targetNode.x + targetNode.width / 2;
        const endY = targetNode.y;
        
        // Criar um caminho curvo
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const controlPointY = (startY + endY) / 2;
        
        path.setAttribute('d', `M ${startX} ${startY} C ${startX} ${controlPointY}, ${endX} ${controlPointY}, ${endX} ${endY}`);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', '#94a3b8');
        path.setAttribute('stroke-width', '2');
        
        // Adicionar seta no final
        const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
        marker.setAttribute('id', `arrow-${step.id}-${nextId}`);
        marker.setAttribute('viewBox', '0 0 10 10');
        marker.setAttribute('refX', '5');
        marker.setAttribute('refY', '5');
        marker.setAttribute('markerWidth', '6');
        marker.setAttribute('markerHeight', '6');
        marker.setAttribute('orient', 'auto');
        
        const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        polygon.setAttribute('points', '0,0 10,5 0,10');
        polygon.setAttribute('fill', '#94a3b8');
        marker.appendChild(polygon);
        
        // Adicionar definição da seta e referência a ela
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        defs.appendChild(marker);
        svg.appendChild(defs);
        
        path.setAttribute('marker-end', `url(#arrow-${step.id}-${nextId})`);
        
        svg.appendChild(path);
      });
    });
    
  }, [journey, onSelectStep]);
  
  return (
    <div ref={containerRef} className="w-full overflow-auto">
      <svg 
        ref={svgRef} 
        className="min-w-full min-h-[500px]"
        xmlns="http://www.w3.org/2000/svg"
      />
    </div>
  );
};
