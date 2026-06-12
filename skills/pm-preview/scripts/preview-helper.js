(function() {
  const WS_URL = 'ws://' + window.location.host;
  let ws = null;
  let eventQueue = [];
  let currentDoc = null;
  let docTree = [];

  // Load marked.js from CDN for Markdown rendering
  function loadMarked(callback) {
    if (typeof marked !== 'undefined') { callback(); return; }
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
    script.onload = callback;
    script.onerror = () => {
      document.getElementById('content-area').innerHTML =
        '<div class="welcome"><h2>Failed to load Markdown renderer</h2><p>Please check your network connection.</p></div>';
    };
    document.head.appendChild(script);
  }

  // ========== WebSocket ==========

  function connect() {
    ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      eventQueue.forEach(e => ws.send(JSON.stringify(e)));
      eventQueue = [];
    };

    ws.onmessage = (msg) => {
      const data = JSON.parse(msg.data);
      if (data.type === 'reload') {
        // Refresh the document tree and re-render current doc
        refreshDocTree().then(() => {
          if (currentDoc) {
            loadDocument(currentDoc, false);
          }
        });
      }
    };

    ws.onclose = () => {
      setTimeout(connect, 1000);
    };
  }

  // ========== Document Tree ==========

  async function refreshDocTree() {
    try {
      const resp = await fetch('/api/docs');
      docTree = await resp.json();
      renderDocTree(docTree);
      updateDocCount(docTree);
    } catch (e) {
      document.getElementById('doc-tree').innerHTML =
        '<div class="sidebar-empty">Failed to load documents</div>';
    }
  }

  function countDocs(nodes) {
    let count = 0;
    for (const node of nodes) {
      if (node.children) {
        count += countDocs(node.children);
      } else {
        count++;
      }
    }
    return count;
  }

  function updateDocCount(tree) {
    const count = countDocs(tree);
    const el = document.getElementById('doc-count');
    if (el) el.textContent = '(' + count + ')';
  }

  function renderDocTree(tree) {
    const container = document.getElementById('doc-tree');
    if (!tree || tree.length === 0) {
      container.innerHTML = '<div class="sidebar-empty">No documents found in docs/</div>';
      return;
    }

    container.innerHTML = '';
    for (const node of tree) {
      renderTreeNode(node, container, 0);
    }
  }

  function renderTreeNode(node, parent, depth) {
    if (node.children) {
      // Directory group
      const group = document.createElement('div');
      group.className = 'dir-group';

      const toggle = document.createElement('button');
      toggle.className = 'dir-toggle';
      toggle.innerHTML = '<span class="arrow">▼</span>' + escapeHtml(node.name);
      toggle.onclick = () => {
        toggle.classList.toggle('collapsed');
        children.classList.toggle('collapsed');
      };

      const children = document.createElement('div');
      children.className = 'dir-children';

      for (const child of node.children) {
        renderTreeNode(child, children, depth + 1);
      }

      group.appendChild(toggle);
      group.appendChild(children);
      parent.appendChild(group);
    } else {
      // Document file
      const item = document.createElement('a');
      item.className = 'doc-item';
      item.textContent = node.name.replace(/\.md$/, '');
      item.title = node.path;
      item.href = '#';
      item.dataset.path = node.path;
      item.onclick = (e) => {
        e.preventDefault();
        loadDocument(node.path, true);
      };
      parent.appendChild(item);
    }
  }

  // ========== Document Loading ==========

  async function loadDocument(docPath, scrollToTop) {
    try {
      const resp = await fetch('/api/doc?path=' + encodeURIComponent(docPath));
      if (!resp.ok) {
        throw new Error('Document not found');
      }
      const doc = await resp.json();

      // Render Markdown
      if (typeof marked === 'undefined') {
        // Retry: marked might not be loaded yet
        loadMarked(() => renderDoc(doc, scrollToTop));
        return;
      }

      renderDoc(doc, scrollToTop);
    } catch (e) {
      document.getElementById('content-area').innerHTML =
        '<div class="welcome"><h2>Failed to load document</h2><p>' + escapeHtml(e.message) + '</p></div>';
    }
  }

  function renderDoc(doc, scrollToTop) {
    currentDoc = doc.path;

    // Update sidebar active state
    document.querySelectorAll('.doc-item.active').forEach(el => el.classList.remove('active'));
    const activeItem = document.querySelector('[data-path="' + CSS.escape(doc.path) + '"]');
    if (activeItem) activeItem.classList.add('active');

    // Render content
    const area = document.getElementById('content-area');
    const html = marked.parse(doc.content);
    area.innerHTML = '<div class="rendered-markdown">' + html + '</div>';

    if (scrollToTop) {
      document.querySelector('.main').scrollTop = 0;
    }
  }

  // ========== Utilities ==========

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ========== Expose API ==========

  window.superpm = {
    refresh: refreshDocTree,
    loadDoc: loadDocument,
    getTree: () => docTree
  };

  // ========== Init ==========

  // Use pre-loaded tree for instant first render (no fetch needed)
  if (typeof DOC_TREE !== 'undefined' && DOC_TREE.length > 0) {
    docTree = DOC_TREE;
    renderDocTree(docTree);
    updateDocCount(docTree);
  }

  // Load marked.js for Markdown rendering
  loadMarked(() => { /* ready */ });

  connect();
})();