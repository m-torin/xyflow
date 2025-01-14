import type { ComponentType } from 'react';
import type { NodeProps } from '@xyflow/system';

import DefaultNode from '../../components/Nodes/DefaultNode';
import InputNode from '../../components/Nodes/InputNode';
import OutputNode from '../../components/Nodes/OutputNode';
import GroupNode from '../../components/Nodes/GroupNode';
import wrapNode from '../../components/Nodes/wrapNode';
import type { NodeTypes, NodeTypesWrapped } from '../../types';

export type CreateNodeTypes = (nodeTypes: NodeTypes) => NodeTypesWrapped;

export function createNodeTypes(nodeTypes: NodeTypes): NodeTypesWrapped {
  const standardTypes: NodeTypesWrapped = {
    input: wrapNode((nodeTypes.input || InputNode) as ComponentType<NodeProps>),
    default: wrapNode((nodeTypes.default || DefaultNode) as ComponentType<NodeProps>),
    output: wrapNode((nodeTypes.output || OutputNode) as ComponentType<NodeProps>),
    group: wrapNode((nodeTypes.group || GroupNode) as ComponentType<NodeProps>),
  };

  const wrappedTypes = {} as NodeTypesWrapped;
  const specialTypes: NodeTypesWrapped = Object.keys(nodeTypes)
    .filter((k) => !['input', 'default', 'output', 'group'].includes(k))
    .reduce((res, key) => {
      res[key] = wrapNode((nodeTypes[key] || DefaultNode) as ComponentType<NodeProps>);

      return res;
    }, wrappedTypes);

  return {
    ...standardTypes,
    ...specialTypes,
  };
}
