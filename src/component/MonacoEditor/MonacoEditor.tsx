// ExampleComponent.tsx
import React from 'react';
import MonacoEditor from '@monaco-editor/react';

const ExampleComponent: React.FC = () => {
  const handleEditorChange = (value: string | undefined) => {
    console.log('Editor value:', value);
  };

  return (
    <div style={{ height: '500px' }}>
      <MonacoEditor
        height="100%"    // 编辑器的高度
        defaultLanguage="javascript" // 默认语言
        defaultValue="// type your code..."
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default MonacoEditor;
