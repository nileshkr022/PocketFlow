import React from 'react';
import ReactFlow, { Background, Controls } from 'reactflow';
import 'reactflow/dist/style.css';

function CashFlowGraph({ transactions }) {
  if (!transactions.length) return null;

  const people = Array.from(new Set(transactions.flatMap(t => [t.from, t.to])));
  const nodeMap = {};
  const nodes = people.map((name, index) => {
    const id = name;
    nodeMap[name] = id;
    return {
      id,
      data: { label: name },
      position: {
        x: 250 * Math.cos((2 * Math.PI * index) / people.length),
        y: 250 * Math.sin((2 * Math.PI * index) / people.length),
      },
      style: { padding: 10, borderRadius: '8px', border: '1px solid #ccc' },
    };
  });

  const edges = transactions.map((t, i) => ({
    id: `e${i}`,
    source: nodeMap[t.from],
    target: nodeMap[t.to],
    label: `₹${t.amount}`,
    animated: true,
    style: { stroke: '#10b981' },
    labelStyle: { fill: '#000', fontWeight: 'bold' },
  }));

  return (
    <div className="h-[500px] w-full mt-8 bg-white rounded-xl shadow">
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default CashFlowGraph;
