import {Graph} from "../../../snowpack/pkg/graphlib.js";
import * as GraphLib from "../../../snowpack/pkg/graphlib.js";
const alg = (GraphLib.default || GraphLib).alg;
import {test} from "./test.js";
export function make_graph(args) {
  const {items, get_id, get_head_ids, get_tail_ids} = args;
  const graph = new Graph();
  items.forEach((item) => graph.setNode(get_id(item), item));
  const id_exists = (id) => graph.hasNode(id);
  items.forEach((item) => {
    const id = get_id(item);
    get_head_ids(item).filter(id_exists).forEach((head_id) => graph.setEdge(id, head_id));
    get_tail_ids(item).filter(id_exists).forEach((tail_id) => graph.setEdge(tail_id, id));
  });
  return graph;
}
export function find_leaf_groups(args) {
  const {graph} = args;
  const ids_to_nodes = factory_ids_to_nodes(graph);
  return find_leaf_group_ids(args).map((ids) => ids_to_nodes(ids));
}
function find_leaf_group_ids(args) {
  const {graph} = args;
  const graph_groups = get_graph_groups({graph});
  const group_ids = [];
  graph_groups.forEach((graph_group) => {
    const group_leaf_ids = find_leaf_ids(graph_group);
    group_leaf_ids.forEach((group_leaf_id) => {
      const single_leaf_group_ids = [group_leaf_id, ...find_all_predecessor_ids(graph, group_leaf_id)];
      group_ids.push(single_leaf_group_ids);
    });
  });
  return group_ids;
}
function get_graph_groups(args) {
  const {graph} = args;
  const groups = alg.components(graph);
  return groups.map((group_ids) => {
    const new_graph = new Graph();
    group_ids.forEach((node_id) => {
      new_graph.setNode(node_id, graph.node(node_id));
      const edges = graph.nodeEdges(node_id) || [];
      edges.forEach((edge) => new_graph.setEdge(edge));
    });
    return new_graph;
  });
}
export function find_leaf_ids(graph) {
  const leaves = graph.nodes().filter((node_id) => {
    const successors = graph.successors(node_id) || [];
    return successors.length === 0;
  });
  return leaves;
}
function find_leaf_ids_for_id(graph, node_id) {
  const leaf_ids = find_leaf_ids(graph);
  const connections = alg.dijkstra(graph, node_id);
  return leaf_ids.filter((leaf_id) => connections[leaf_id].distance < Number.POSITIVE_INFINITY);
}
function find_all_predecessor_ids(graph, node_id, allow_self = false) {
  const ids_to_explore = graph.predecessors(node_id) || [];
  const predecessors = new Set();
  let id_to_explore = ids_to_explore.pop() || "";
  while (id_to_explore) {
    if (!predecessors.has(id_to_explore)) {
      if (allow_self || id_to_explore !== node_id) {
        predecessors.add(id_to_explore);
        const predecessors_to_explore = graph.predecessors(id_to_explore) || [];
        ids_to_explore.push(...predecessors_to_explore);
      }
    }
    id_to_explore = ids_to_explore.pop() || "";
  }
  return Array.from(predecessors);
}
function factory_ids_to_nodes(graph) {
  return (ids) => ids.map((id) => graph.node(id));
}
function run_tests() {
  console.log("running tests of make_graph, find_leaves");
  const get_id = (i) => i.id;
  const get_head_ids = (i) => i.head_ids;
  const get_tail_ids = (i) => i.tail_ids;
  const _make_graph = (items) => {
    return make_graph({items, get_id, get_head_ids, get_tail_ids});
  };
  let graph;
  function test_graph(graph2, id, expected) {
    test(graph2.node(id), expected.item);
    const out = graph2.outEdges(id) || [];
    test(out.map((e) => e.w), expected.head_ids);
    const ins = graph2.inEdges(id) || [];
    test(ins.map((e) => e.v), expected.tail_ids);
  }
  function simple_graph() {
    const items = [{id: "1", head_ids: [], tail_ids: []}];
    const graph2 = _make_graph(items);
    return {items, graph: graph2};
  }
  function simple_circular_and_leaf() {
    const items = [
      {id: "1", head_ids: ["2", "4"], tail_ids: []},
      {id: "2", head_ids: ["1", "3"], tail_ids: []},
      {id: "3", head_ids: [], tail_ids: []},
      {id: "4", head_ids: [], tail_ids: []}
    ];
    const graph2 = _make_graph(items);
    return {items, graph: graph2};
  }
  function simple_multi_group_graph() {
    const items = [
      {id: "1", head_ids: ["2"], tail_ids: []},
      {id: "2", head_ids: [], tail_ids: []},
      {id: "3", head_ids: [], tail_ids: []},
      {id: "4", head_ids: ["5"], tail_ids: []},
      {id: "5", head_ids: [], tail_ids: []}
    ];
    const graph2 = _make_graph(items);
    return {items, graph: graph2};
  }
  function multi_group_graph() {
    const items = [
      {id: "1", head_ids: [], tail_ids: []},
      {id: "2", head_ids: ["3"], tail_ids: []},
      {id: "3", head_ids: ["4"], tail_ids: []},
      {id: "4", head_ids: [], tail_ids: []},
      {id: "5", head_ids: [], tail_ids: []},
      {id: "6", head_ids: ["5"], tail_ids: []},
      {id: "7", head_ids: ["6"], tail_ids: []},
      {id: "8", head_ids: ["10"], tail_ids: []},
      {id: "9", head_ids: ["8"], tail_ids: []},
      {id: "10", head_ids: ["9"], tail_ids: []},
      {id: "11", head_ids: ["12", "13"], tail_ids: ["12", "13"]},
      {id: "12", head_ids: ["11", "13"], tail_ids: ["11", "13"]},
      {id: "13", head_ids: ["12", "11"], tail_ids: ["12", "11"]},
      {id: "14", head_ids: ["14"], tail_ids: ["14"]},
      {id: "15", head_ids: [], tail_ids: ["16"]},
      {id: "16", head_ids: [], tail_ids: []},
      {id: "17", head_ids: ["16"], tail_ids: []},
      {id: "15b", head_ids: [], tail_ids: []},
      {id: "16b", head_ids: ["15b"], tail_ids: ["17b"]},
      {id: "17b", head_ids: [], tail_ids: []}
    ];
    const graph2 = _make_graph(items);
    return {items, graph: graph2};
  }
  function branched_circular_multi_leaf() {
    const items = [
      {id: "4", head_ids: ["2"], tail_ids: []},
      {id: "2", head_ids: ["3"], tail_ids: []},
      {id: "3", head_ids: ["2", "1", "4", "7"], tail_ids: []},
      {id: "1", head_ids: ["5", "6", "9"], tail_ids: []},
      {id: "5", head_ids: [], tail_ids: []},
      {id: "6", head_ids: [], tail_ids: []},
      {id: "7", head_ids: ["8"], tail_ids: []},
      {id: "8", head_ids: ["7"], tail_ids: []},
      {id: "9", head_ids: ["5"], tail_ids: []}
    ];
    const graph2 = _make_graph(items);
    return {items, graph: graph2};
  }
  function out_of_scope_node() {
    const items = [
      {id: "1", head_ids: ["2"], tail_ids: ["3"]}
    ];
    const graph2 = _make_graph(items);
    return {items, graph: graph2};
  }
  const s = simple_graph();
  const m = multi_group_graph();
  const scl = simple_circular_and_leaf();
  const smg = simple_multi_group_graph();
  const bcml = branched_circular_multi_leaf();
  const oosn = out_of_scope_node();
  test_graph(s.graph, "0", {item: void 0, head_ids: [], tail_ids: []});
  test_graph(s.graph, "1", {item: s.items[0], head_ids: [], tail_ids: []});
  test_graph(m.graph, "1", {item: m.items[0], head_ids: [], tail_ids: []});
  test_graph(m.graph, "2", {item: m.items[1], head_ids: ["3"], tail_ids: []});
  test_graph(m.graph, "3", {item: m.items[2], head_ids: ["4"], tail_ids: ["2"]});
  test_graph(m.graph, "4", {item: m.items[3], head_ids: [], tail_ids: ["3"]});
  test_graph(m.graph, "5", {item: m.items[4], head_ids: [], tail_ids: ["6"]});
  test_graph(m.graph, "6", {item: m.items[5], head_ids: ["5"], tail_ids: ["7"]});
  test_graph(m.graph, "7", {item: m.items[6], head_ids: ["6"], tail_ids: []});
  test_graph(m.graph, "8", {item: m.items[7], head_ids: ["10"], tail_ids: ["9"]});
  test_graph(m.graph, "9", {item: m.items[8], head_ids: ["8"], tail_ids: ["10"]});
  test_graph(m.graph, "10", {item: m.items[9], head_ids: ["9"], tail_ids: ["8"]});
  test_graph(m.graph, "11", {item: m.items[10], head_ids: ["12", "13"], tail_ids: ["12", "13"]});
  test_graph(m.graph, "12", {item: m.items[11], head_ids: ["11", "13"], tail_ids: ["11", "13"]});
  test_graph(m.graph, "13", {item: m.items[12], head_ids: ["11", "12"], tail_ids: ["11", "12"]});
  test_graph(m.graph, "14", {item: m.items[13], head_ids: ["14"], tail_ids: ["14"]});
  test_graph(m.graph, "15", {item: m.items[14], head_ids: [], tail_ids: ["16"]});
  test_graph(m.graph, "16", {item: m.items[15], head_ids: ["15"], tail_ids: ["17"]});
  test_graph(m.graph, "17", {item: m.items[16], head_ids: ["16"], tail_ids: []});
  test_graph(m.graph, "15b", {item: m.items[17], head_ids: [], tail_ids: ["16b"]});
  test_graph(m.graph, "16b", {item: m.items[18], head_ids: ["15b"], tail_ids: ["17b"]});
  test_graph(m.graph, "17b", {item: m.items[19], head_ids: ["16b"], tail_ids: []});
  test_graph(oosn.graph, "1", {item: oosn.items[0], head_ids: [], tail_ids: []});
  test(find_leaf_ids(scl.graph), ["3", "4"]);
  test(find_leaf_ids(smg.graph), ["2", "3", "5"]);
  test(find_leaf_ids(bcml.graph), ["5", "6"]);
  test(find_leaf_ids_for_id(bcml.graph, "12"), []);
  test(find_leaf_ids_for_id(bcml.graph, "1"), ["5", "6"]);
  test(find_leaf_ids_for_id(bcml.graph, "2"), ["5", "6"]);
  test(find_leaf_ids_for_id(bcml.graph, "7"), []);
  test(find_leaf_group_ids(s), [["1"]]);
  test(find_leaf_group_ids(scl), [["4", "1", "2"], ["3", "2", "1"]]);
  test(find_all_predecessor_ids(s.graph, "1"), []);
  test(find_all_predecessor_ids(scl.graph, "1"), ["2"]);
  test(find_all_predecessor_ids(scl.graph, "2"), ["1"]);
  test(find_all_predecessor_ids(scl.graph, "3"), ["1", "2"]);
  test(find_all_predecessor_ids(scl.graph, "4"), ["1", "2"]);
  test(find_all_predecessor_ids(bcml.graph, "2"), ["3", "4"]);
  test(find_all_predecessor_ids(bcml.graph, "8"), ["2", "3", "4", "7"]);
  test(find_all_predecessor_ids(bcml.graph, "5"), ["1", "2", "3", "4", "9"]);
}
