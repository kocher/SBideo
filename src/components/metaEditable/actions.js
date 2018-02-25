import crawl from 'tree-crawl';

const actions = ({ setState }) => ({
  saveTree: (state, newMeta) => {
    return {
      data: setNewMetaInTree(state.data, newMeta)
    };
  },

  handleSave: (state, newMeta, src) => {
    setState({ saving: true });
    this.saveTree(state, newMeta);

    return fetch(src.replace('video.mp4', 'meta.json'), {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(newMeta)
    })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(json => ({ data: json, saving: false }))
      .catch(error => ({ error, saving: false }));
  }
});

const setNewMetaInTree = (tree, newMeta) => {
  crawl(
    tree,
    (node, context) => {
      if (node.meta && node.meta.id === newMeta.id) {
        const newNode = node;
        newNode.meta = newMeta;

        context.parent.items[context.index] = newNode;
        context.replace(newNode);
      }
    },
    { getChildren: node => node.items }
  );
  return tree;
};

export default actions;
