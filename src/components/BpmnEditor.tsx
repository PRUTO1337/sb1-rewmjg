import React, { useEffect, useRef } from 'react';
import BpmnJS from 'bpmn-js/lib/Modeler';
import { useEditorStore } from '../store/editorStore';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn.css';

const EMPTY_DIAGRAM = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd" id="sample-diagram" targetNamespace="http://bpmn.io/schema/bpmn">
  <bpmn2:process id="Process_1" isExecutable="false">
    <bpmn2:startEvent id="StartEvent_1"/>
  </bpmn2:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
        <dc:Bounds height="36.0" width="36.0" x="412.0" y="240.0"/>
      </bpmndi:BPMNShape>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn2:definitions>`;

interface BpmnEditorProps {
  className?: string;
}

export function BpmnEditor({ className }: BpmnEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const setModeler = useEditorStore(state => state.setModeler);
  const modelerRef = useRef<BpmnJS | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const modeler = new BpmnJS({
      container: containerRef.current,
      keyboard: {
        bindTo: document
      },
      additionalModules: [],
      moddleExtensions: {
        camunda: {}
      }
    });

    modelerRef.current = modeler;
    setModeler(modeler);

    const initializeDiagram = async () => {
      try {
        await modeler.importXML(EMPTY_DIAGRAM);
        const canvas = modeler.get('canvas');
        canvas.zoom('fit-viewport');
      } catch (err) {
        console.error('Error initializing BPMN diagram:', err);
      }
    };

    initializeDiagram();

    return () => {
      modeler.destroy();
      modelerRef.current = null;
    };
  }, [setModeler]);

  return (
    <div 
      ref={containerRef} 
      className={`w-full h-full ${className}`}
    />
  );
}