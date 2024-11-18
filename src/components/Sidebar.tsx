import React, { useState } from 'react';
import { useEditorStore } from '../store/editorStore';
import { 
  CircleDot, 
  Square, 
  Diamond, 
  ArrowRight,
  Users,
  MessageCircle
} from 'lucide-react';

export function Sidebar() {
  const [processDescription, setProcessDescription] = useState('');
  
  const handleGenerateFlow = () => {
    if (!processDescription.trim()) {
      alert('Please enter a process description first.');
      return;
    }
    alert('AI flow generation coming soon!\nDescription: ' + processDescription);
  };

  const elements = [
    { icon: <CircleDot className="w-5 h-5" />, label: 'Events', type: 'bpmn:StartEvent' },
    { icon: <Square className="w-5 h-5" />, label: 'Tasks', type: 'bpmn:Task' },
    { icon: <Diamond className="w-5 h-5" />, label: 'Gateways', type: 'bpmn:ExclusiveGateway' },
    { icon: <ArrowRight className="w-5 h-5" />, label: 'Flows', type: 'bpmn:SequenceFlow' },
    { icon: <Users className="w-5 h-5" />, label: 'Pools & Lanes', type: 'bpmn:Participant' }
  ];

  const handleDragStart = (event: React.DragEvent, type: string) => {
    event.dataTransfer.setData('type', type);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <div className="space-y-4">
        <div className="font-medium text-sm text-gray-500">Elements</div>
        <div className="space-y-2">
          {elements.map((element, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 cursor-move"
              draggable
              onDragStart={(e) => handleDragStart(e, element.type)}
            >
              {element.icon}
              <span className="text-sm">{element.label}</span>
            </div>
          ))}
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          <div className="font-medium text-sm text-gray-500 mb-2">AI Assistant</div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex items-center gap-2 text-blue-600 mb-2">
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Process Assistant</span>
            </div>
            <p className="text-xs text-gray-600">
              Describe your process in natural language and I'll help you create it.
            </p>
            <textarea
              className="w-full mt-2 p-2 text-sm border border-blue-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Describe your process..."
              rows={3}
              value={processDescription}
              onChange={(e) => setProcessDescription(e.target.value)}
            />
            <button 
              className="mt-2 w-full bg-blue-600 text-white text-sm py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              onClick={handleGenerateFlow}
            >
              Generate Flow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}