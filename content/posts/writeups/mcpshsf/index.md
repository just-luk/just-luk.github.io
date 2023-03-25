---
title: "MCPSHSF 2023 Writeup"
draft: false
description: "A walkthrough of all the challenges in MCPSF 2023"
summary: "A detailed walkthrough of all the challenges in MCPSF 2023. It also includes who killed Chance..."
tags: ["writeups", "ctfs"]
showReadingTime: false
showDate: false
---

## Challenge Graph

Here's a graph of all the challenges for MCPSHSF 2023:
{{< rawhtml >}}
<script src="//unpkg.com/force-graph"></script>
<script src="//unpkg.com/d3-quadtree"></script>
<script src="//unpkg.com/d3-force"></script>
<div id="graph"></div>
<script>
  data = {
    "nodes": [
        {"id": "Twitter", "group": 1},
        {"id": "Caesar Cipher", "group": 2},
        {"id": "Xor", "group": 2},
        {"id": "Base64", "group": 2},
        {"id": "Corncob's Website", "group": 2},
        {"id": "Facebook", "group": 2},
        {"id": "Chance's Blog", "group": 2},
        {"id": "Vacation Image", "group": 2},
        {"id": "Secret Chat", "group": 2},
        {"id": "Dead Chance", "group": 3},
        {"id": "Corncob's Office", "group": 3},
        {"id": "Pan Image", "group": 3},
        {"id": "Robot Images", "group": 3},
        {"id": "Fileshare", "group": 3},
        {"id": "Long's Madlibs", "group": 3},
        {"id": "Lockpicking", "group": 3},
        {"id": "Unknown Encryption", "group": 3},
        {"id": "Latke Recipe", "group": 3},
        {"id": "SQL Log", "group": 3},
        {"id": "Invisible Message", "group": 3},
        {"id": "Keyboard PCAP", "group": 3},
        {"id": "Memory Dump", "group": 3},
        {"id": "Encrypted Zip", "group": 4},
        {"id": "Spectrogram", "group": 4},
        {"id": "PCAP Logins", "group": 4},
        {"id": "Broken PNG", "group": 4},
        {"id": "Virtual Machine", "group": 4},
        {"id": "Chrome History", "group": 5},
        {"id": "Git Repo", "group": 5}
    ],
    "links" : [
        {"source": "Twitter", "target": "Caesar Cipher", "value": 1},
        {"source": "Twitter", "target": "Xor", "value": 1},
        {"source": "Twitter", "target": "Base64", "value": 1},
        {"source": "Twitter", "target": "Corncob's Website", "value": 1},
        {"source": "Twitter", "target": "Facebook", "value": 1},
        {"source": "Twitter", "target": "Chance's Blog", "value": 1},
        {"source": "Twitter", "target": "Vacation Image", "value": 1},
        {"source": "Twitter", "target": "Secret Chat", "value": 1},
        {"source" : "Facebook", "target": "Dead Chance", "value": 1},
        {"source" : "Facebook", "target": "Corncob's Office", "value": 1},
        {"source" : "Facebook", "target": "Pan Image", "value": 1},
        {"source" : "Facebook", "target": "Robot Images", "value": 1},
        {"source" : "Facebook", "target": "Fileshare", "value": 1},
        {"source" : "Facebook", "target": "Long's Madlibs", "value": 1},
        {"source" : "Chance's Blog", "target": "Lockpicking", "value": 1},
        {"source" : "Chance's Blog", "target": "Unknown Encryption", "value": 1},
        {"source" : "Chance's Blog", "target": "Latke Recipe", "value": 1},
        {"source" : "Chance's Blog", "target": "SQL Log", "value": 1},
        {"source" : "Secret Chat", "target": "Invisible Message", "value": 1},
        {"source" : "Secret Chat", "target": "Keyboard PCAP", "value": 1},
        {"source" : "Secret Chat", "target": "Memory Dump", "value": 1},
        {"source" : "Fileshare", "target": "Encrypted Zip", "value": 1},
        {"source" : "Fileshare", "target": "Spectrogram", "value": 1},
        {"source" : "Fileshare", "target": "PCAP Logins", "value": 1},
        {"source" : "Fileshare", "target": "Broken PNG", "value": 1},
        {"source" : "Fileshare", "target": "Virtual Machine", "value": 1},
        {"source" : "Virtual Machine", "target": "Chrome History", "value": 1},
        {"source" : "Virtual Machine", "target": "Git Repo", "value": 1}
    ]
  }
  const getColor = (node) => {
    switch (node.group) {
      case 1:
        return '#ECEBF3'
      case 2:
        return '#EC7D10';
      case 3:
        return '#D56AA0';
      case 4:
        return '#A64253';
      case 5:
        return '#8A4E19';
      default:
        return '#000000';
    }
  };
  const Graph = ForceGraph()
    (document.getElementById('graph'))
      .graphData(data)
      .nodeId('id')
      .linkSource('source')
      .linkTarget('target')
      .width(575)
      .height(550)
      .backgroundColor('dark: black white')
      .linkColor(() => '#616850')
      .linkDirectionalArrowLength(10)
      .nodeCanvasObject((node, ctx, globalScale) => {
        const label = node.id;
        const fontSize = 14/globalScale;
        ctx.font = `${fontSize}px ui-monospace`;
        const textWidth = ctx.measureText(label).width;
        const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = getColor(node);
        ctx.fillText(label, node.x, node.y);
        node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
        });
    Graph.cooldownTime(Infinity)
      .d3Force('collide', d3.forceCollide(Graph.nodeRelSize() + 20));
    Graph.onEngineStop(() => Graph.zoomToFit(400));
</script>
{{< /rawhtml >}}

I will now go through each challenge, along with the evidence on each website.
## Twitter
### Caesar Cipher

### Xor

### Base64

### Corncob's Website

### Vacation Image

### Other Tweets

## Facebook
### Dead Chance

### Corncob's Office

### Pan Image

### Robot Images

### Fileshare

### Long's Madlibs

### Other Posts

## Chance's Blog
### Lockpicking

### Unknown Encryption

### Latke Recipe

### SQL Log

## Fileshare
### Encrypted Zip

### Spectrogram

### PCAP Logins

### Broken PNG

## Virtual Machine
### Chrome History

### Git Repo

## Secret Chat
### Invisible Message

### Keyboard PCAP

### Memory Dump

## Conclusion

Based on all of the evidence, Long is clearly the murderer. Chance's cartel members don't have enough motive to kill him, and actualy cared about him. While Corncob has some motive, there is more evidence suggesting Long was the murderer. He was angry at Chance for not giving him laktes, as shown by his diary and posts on Twitter. His fingerprints line up with the fingerprints on the murder weapon, and there is a written confession.
