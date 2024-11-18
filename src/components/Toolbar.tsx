import React from 'react';
import { useEditorStore } from '../store/editorStore';
import { 
  Save, 
  FolderOpen, 
  Download, 
  Share2, 
  Undo2, 
  Redo2,
  Wand2,
  History,
  MessageSquare,
  Library
} from 'lucide-react';

export function Toolbar() {
  const { undo, redo, saveXML, exportSVG, loadXML } = useEditorStore();
  const buttonClass = "p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
  const iconClass = "w-5 h-5";

  const handleSave = async () => {
    try {
      const xml = await saveXML();
      const blob = new Blob([xml], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'process.bpmn';
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error saving diagram:', error);
    }
  };

  const handleLoad = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.bpmn,.xml';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const xml = e.target?.result as string;
          try {
            await loadXML(xml);
          } catch (error) {
            console.error('Error loading diagram:', error);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleExport = async () => {
    try {
      const svg = await exportSVG();
      const blob = new Blob([svg], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'process.svg';
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting diagram:', error);
    }
  };

  const handleShare = () => {
    alert('Sharing functionality coming soon!');
  };

  const handleAiSuggest = () => {
    alert('AI suggestions coming soon!');
  };

  const handleHistory = () => {
    alert('Version history coming soon!');
  };

  const handleTemplates = () => {
    alert('Templates library coming soon!');
  };

  const handleComments = () => {
    alert('Comments system coming soon!');
  };

  return (
    <div className="flex items-center gap-2">
      <button onClick={handleSave} className={buttonClass} title="Save">
        <Save className={iconClass} />
      </button>
      <button onClick={handleLoad} className={buttonClass} title="Open">
        <FolderOpen className={iconClass} />
      </button>
      <button onClick={handleExport} className={buttonClass} title="Export">
        <Download className={iconClass} />
      </button>
      <button onClick={handleShare} className={buttonClass} title="Share">
        <Share2 className={iconClass} />
      </button>
      <div className="w-px h-6 bg-gray-200 mx-2" />
      <button onClick={undo} className={buttonClass} title="Undo">
        <Undo2 className={iconClass} />
      </button>
      <button onClick={redo} className={buttonClass} title="Redo">
        <Redo2 className={iconClass} />
      </button>
      <div className="w-px h-6 bg-gray-200 mx-2" />
      <button onClick={handleAiSuggest} className={`${buttonClass} text-blue-600`} title="AI Suggestions">
        <Wand2 className={iconClass} />
      </button>
      <button onClick={handleHistory} className={buttonClass} title="Version History">
        <History className={iconClass} />
      </button>
      <button onClick={handleTemplates} className={buttonClass} title="Templates">
        <Library className={iconClass} />
      </button>
      <button onClick={handleComments} className={buttonClass} title="Comments">
        <MessageSquare className={iconClass} />
      </button>
    </div>
  );
}