import { create } from 'zustand';
import BpmnJS from 'bpmn-js/lib/Modeler';

interface EditorState {
  modeler: BpmnJS | null;
  setModeler: (modeler: BpmnJS) => void;
  undo: () => void;
  redo: () => void;
  saveXML: () => Promise<string>;
  loadXML: (xml: string) => Promise<void>;
  exportSVG: () => Promise<string>;
  exportXML: () => Promise<string>;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  modeler: null,
  
  setModeler: (modeler) => set({ modeler }),
  
  undo: () => {
    const { modeler } = get();
    if (!modeler) return;
    try {
      modeler.get('commandStack').undo();
    } catch (err) {
      console.error('Error performing undo:', err);
    }
  },
  
  redo: () => {
    const { modeler } = get();
    if (!modeler) return;
    try {
      modeler.get('commandStack').redo();
    } catch (err) {
      console.error('Error performing redo:', err);
    }
  },
  
  saveXML: async () => {
    const { modeler } = get();
    if (!modeler) throw new Error('Modeler not initialized');
    
    try {
      const { xml } = await modeler.saveXML({ format: true });
      return xml;
    } catch (err) {
      console.error('Error saving XML:', err);
      throw err;
    }
  },
  
  loadXML: async (xml: string) => {
    const { modeler } = get();
    if (!modeler) throw new Error('Modeler not initialized');
    
    try {
      await modeler.importXML(xml);
      const canvas = modeler.get('canvas');
      canvas.zoom('fit-viewport');
    } catch (err) {
      console.error('Error loading XML:', err);
      throw err;
    }
  },
  
  exportSVG: async () => {
    const { modeler } = get();
    if (!modeler) throw new Error('Modeler not initialized');
    
    try {
      const { svg } = await modeler.saveSVG();
      return svg;
    } catch (err) {
      console.error('Error exporting SVG:', err);
      throw err;
    }
  },
  
  exportXML: async () => {
    const { modeler } = get();
    if (!modeler) throw new Error('Modeler not initialized');
    
    try {
      const { xml } = await modeler.saveXML({ format: true });
      return xml;
    } catch (err) {
      console.error('Error exporting XML:', err);
      throw err;
    }
  },
}));