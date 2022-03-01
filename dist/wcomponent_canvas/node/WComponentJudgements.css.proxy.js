// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "\n.node_judgements_container\n{\n    /*\n    Some change in last 12 hours means this is the only\n    way I have found to display the JudgementBagdes\n    */\n    /* As of 2022-02-28 this is no longer needed and without it, it allows the judgements to wrap if there are many judgements associated with a node */\n    /* display: contents; */\n}\n";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}