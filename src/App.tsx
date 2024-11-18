import React from 'react';
import { BpmnEditor } from './components/BpmnEditor';
import { Toolbar } from './components/Toolbar';
import { Sidebar } from './components/Sidebar';
import { Brain } from 'lucide-react';

function App() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-2">
            <div className="flex items-center gap-2">
              <Brain className="w-8 h-8 text-blue-600" />
              <h1 className="text-xl font-semibold">BPMN Edytor Martynki</h1>
            </div>
            <Toolbar />
          </div>
        </header>
        
        <main className="flex-1 relative">
          <BpmnEditor className="absolute inset-0" />
        </main>
      </div>
    </div>
  );
}

export default App;