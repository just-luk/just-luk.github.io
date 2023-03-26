---
title: "MCPS HSF 2023 Writeup"
draft: false
description: "A walkthrough of all the challenges in MCPSF 2023"
summary: "A detailed walkthrough of all the challenges in MCPSF 2023. It also includes who killed Chance..."
tags: ["writeups", "ctfs"]
showReadingTime: false
showDate: false
---
## Quick Note

MCPS HSF (Montgomery County Public Schools High School Forensics) is a CTF competition for high school students in Montgomery County, Maryland. This year, it was held on March 14th, 2023. All challenges were generated using [chalgen](https://github.com/CTFg/chalgen), a tool we wrote to generate CTF challenges. If you want to see the source code for this competition, visit the [competitions/mcpshsf-2023](https://github.com/CTFg/chalgen/tree/master/competitions/mcpshsf-2023) folder. The competition also used [CTFg](https://github.com/CTFg/CTFg), a custom web application we wrote for HSFs, to allow competitors to connect and enter evidence. If you like these types of competitions, please give us a star on GitHub! 

{{< rawhtml >}}
<div class="flex flex-row justify-center items-center">
<h4>CTFg</h4>
<h1 class="opacity-0">fillertextfil</h1>
<h4>Chalgen</h4>
</div>
<div>
<div class="flex flex-row justify-center items-center">
<a href="https://github.com/CTFg/CTFg"><img src="https://img.shields.io/github/stars/CTFg/CTFg?style=for-the-badge&logo=Github"/></a>
<h1 class="opacity-0">fillerte</h1>
<a href="https://github.com/CTFg/chalgen"><img src="https://img.shields.io/github/stars/CTFg/chalgen?style=for-the-badge&logo=Github"/></a>
</div>
{{< /rawhtml >}}

The challenges were all based on real-world forensics challenges, but with a twist. The twist was that the challenges were all based on the same story, and the challenges were all interconnected. The goal was to solve all the challenges and figure out who killed Chance. 

## Challenge Graph

Here's a graph of all the challenges for MCPS HSF 2023:
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
        return '#C77DFF';
      case 2:
        return '#ff8fa3';
      case 3:
        return '#9D4EDD';
      case 4:
        return '#D56AA0';
      case 5:
        return '#7B2CBF';
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
      .linkColor(() => '#848482')
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
### Getting Started
From the challenge document, we are given the username `sadamana`, the password `s4d4m4n4`, and url [https://twitter-flask.chals.mcpshsf.com/](https://twitter-flask.chals.mcpshsf.com/). We can log in with these credentials, and we are greeted with the following page:
![entry](entryflag.png)
Hooray! We got our first flag of `flag{you_found_twitter}`! We can now login using the credentials mentioned above and start looking for more clues.

### Caesar Cipher
Scrolling through the tweets, we find this suspicious tweet from Long:

> sw mywsxq kpdob iye pvkq{k_fobi_lkcsm_mkockb_mszrob}

This text was probably encrypted with a Caesar cipher, because it looks like each letter was shifted. After using [this website](https://www.dcode.fr/caesar-cipher) to decode it, we get the following message:
```
im coming after you flag{a_very_basic_caesar_cipher}
```
Very interesting message... We now have a new flag of `flag{a_very_basic_caesar_cipher}` and new suspect of Long. Let's keep looking for more clues.

### Xor
Looking through the tweets, we also find this tweet from Corncob:
```
I learned about new cryptography technique, anyone want to take a byte?
08020f09151d5d0a5f035d001a5a1c17311c5e0d051300011e0b424e030f170c0b4e060be281b71d4e041b1d1a4e1e020f170700094e260b0f1c1a061c010d054e190607020b4e27e281b7034e060b1c0b4e0a010700094e0f02024e06071d4e19011c054e08011c4e060703
```
This looks like a hex string, but it doesn't decode to anything. However, if we try brute forcing an xor key using [this website](https://cyberchef.org/), we get the following message:
```
flag{s3d1m3nt4ry_r0ck} 
nope, maybe he is just playing Hearthrock while I am here doing all his work
```
This gives us a new flag of `flag{s3d1m3nt4ry_r0ck}`. We also suspect Corncob, as he seems angry at Chance for giving him too much work. However, we still need more evidence. 

### Base64
This tweet from Karst also looks important:
```
dSA9IGthcnN0LCBwYXNzID0gRVNTX2Ywcl90aDNfdzFuCmZsYWd7Y3IzZDVfNHIzX3U1M2Z1MV93MHd9
```
Because of the characters in the string, it is probably encoded with Base64. After decoding it with [this website](https://www.base64decode.org/), we get this message:
```
u = karst, pass = ESS_f0r_th3_w1n
flag{cr3d5_4r3_u53fu1_w0w}
```
It's a new flag! `flag{cr3d5_4r3_u53fu1_w0w}`. We also got some new credentials for Karst. We can now login with these credentials and look for even more clues. Looking in Karst's direct messages, we find that he messaged himself with his Facebook credentials:

> fb creds so i dont forget username: Karst, password: 3ddy_Curr3nT5

In HSFs, it's important to note any credentials found, as they may be useful later. In this case, we can use these credentials to login to Facebook.

### Corncob's Website
Corncob mentions that his credentials on his website  [http://corncobs-sus-website.chals.mcpshsf.com](http://corncobs-sus-website.chals.mcpshsf.com) and that finding them is related to robots. This is a hint that we need to look at the robots.txt file. After looking at the robots.txt file, we find this:
```
User-agent: *
Disallow: flag{domo_arigato}
User: corncob, pass: L4tk3_M4f14_L0rd_123
```
We now have a new flag of `flag{domo_arigato}` and new credentials for Corncob. We can login to Twitter with these credentials and look 
in Corncob's DMs for more clues. In Corncob's DMs, we find a new [website](https://secret-chat.chals.mcpshsf.com/). Unfortunately, none of our credentials work on this website, so let's save this site for later. 

We also find that Long begged Corncob for laktes, and Corncob refused. This could show that Long has some motive to kill Chance, as chance sells laktes. However, the DMs also show that Chance is Corncob's boss, and Corncob is angry at Chance for making him do too much work. This means Corncob is also a suspect. 
### Other Clues
This Tweet from chance looks important:

> i just launched my new cooking blog! Check it out! http://jekyll-blog.chals.mcpshsf.com

This website looks like Chance's cooking blog.  We also find that Long is angry at Chance for not giving him laktes, as he says:

> bruh if i dont get some latkes rn imma throw hands

This could be a motive for Long to kill Chance. In addition, Chance appears to part of latke cartel. We also find another site, [Facebook](https://facebook-django.chals.mcpshsf.com). This site looks like the Facebook site that Karst has credentials for. Let's explore this site for more clues.

## Facebook
### Dead Chance
Upon logging into Facebook, we find a picture of Chance's dead body with a pan next to it. This image is shown here:
![Image](chance.jpg)
There also appears to a fingerprint on the pan. These could be clues to who killed Chance. Let's also look at the metadata of the image. We can do this by running `exiftool` on the image. We get the following output:
```
ExifTool Version Number         : 12.40
File Name                       : chance.jpg
Directory                       : .
File Size                       : 361 KiB
File Modification Date/Time     : 2023:03:25 15:54:35-04:00
File Access Date/Time           : 2023:03:25 15:59:49-04:00
File Inode Change Date/Time     : 2023:03:25 15:54:41-04:00
File Permissions                : -rwxrwxrwx
File Type                       : JPEG
File Type Extension             : jpg
MIME Type                       : image/jpeg
JFIF Version                    : 1.01
Exif Byte Order                 : Big-endian (Motorola, MM)
Image Description               : Screenshot
Orientation                     : Horizontal (normal)
X Resolution                    : 57
Y Resolution                    : 57
Resolution Unit                 : cm
Software                        : GIMP 2.10.32
Modify Date                     : 2023:03:07 04:46:43
Artist                          : ZmxhZ3toZV9kZWFkX29oX25vfQ==
User Comment                    : Screenshot
Color Space                     : sRGB
Exif Image Width                : 1814
Exif Image Height               : 1364
GPS Version ID                  : 0.0.0.1
GPS Latitude Ref                : Unknown (E)
GPS Longitude Ref               : Unknown (S)
Subfile Type                    : Reduced-resolution image
Compression                     : JPEG (old-style)
Photometric Interpretation      : YCbCr
Samples Per Pixel               : 3
Thumbnail Offset                : 593
Thumbnail Length                : 10216
Comment                         : Screenshot
Image Width                     : 1814
Image Height                    : 1364
Encoding Process                : Baseline DCT, Huffman coding
Bits Per Sample                 : 8
Color Components                : 3
Y Cb Cr Sub Sampling            : YCbCr4:2:0 (2 2)
Image Size                      : 1814x1364
Megapixels                      : 2.5
Thumbnail Image                 : (Binary data 10216 bytes, use -b option to extract)
GPS Latitude                    : 19 deg 54' 36.24" N
GPS Longitude                   : 155 deg 35' 55.44" E
GPS Position                    : 19 deg 54' 36.24" N, 155 deg 35' 55.44" E
```
The artist field looks suspicious, and is likely base64 encoded. Using this [website](https://www.base64decode.org/), we can decode the string. We get the following flag: `flag{he_dead_oh_no}`. 

### Corncob's Office
Scrolling down further, we find a post from Corncob. This post is shown here:

> guys i just wanted to say that my boss is an awful human being he never does any of his own work so i do all the dirty work and ngl im lowkey glad he's gone. Here's his office it's so gross and he just left for another party and i'm here cleaning it up. Thanks for listening to my ted talk. http://chal-host.chals.mcpshsf.com/edited_photo.png

This makes Corncob a bigger suspect, as he is glad that Chance is gone. He also hates Chance for being lazy and giving him all the work. The image he posted is shown here:
![Image](office.png)

To get more information about this image, let's run strings on it to see if anything pops up. Running `strings office.jpg` and looking for anything that looks like a flag, we find what we are looking for: `flag{n0t3p4d++_15_0ur_s4v10r}`.
### Pan Image
Hubbz also posted a picture of the pan that was next to Chance's body. This image is shown here:
![Image](pan.png)

This makes Hubbz a suspect, as Chance was killed with a pan. However, we need more evidence before we make a conclusion. Analyzing this image further with `zsteg`, we get the following output:
```shell
b1,r,lsb,xy         .. text: "?v7\n\"QBVR@"
b1,rgb,lsb,xy       .. text: "58:flag{l0v3ly_sup3r_b3st_3nc0d1ng}username: k4r5t_t0p0gr4phy"
b1,bgr,lsb,xy       .. file: OpenPGP Secret Key
b2,r,lsb,xy         .. text: "UUUUUUUUUUUUUUUUUUUUUUUUUUUT"
b2,r,msb,xy         .. text: "u]UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU"
b2,g,lsb,xy         .. text: "UUUUUUUUUUUUUUUUUUUUUUUUUUUT"
b2,g,msb,xy         .. text: ["U" repeated 43 times]
b2,b,lsb,xy         .. text: "UUUUUUUUUUUUUUUUUUUUUUUUUUUT"
b2,b,msb,xy         .. text: "}WUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU"
b2,rgb,msb,xy       .. text: ["U" repeated 132 times]
b2,bgr,msb,xy       .. text: ["U" repeated 132 times]
b2,abgr,msb,xy      .. text: "wWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW"
b3,abgr,msb,xy      .. file: MPEG ADTS, layer I, v2, 256 kbps, Monaural
b4,r,msb,xy         .. text: ["w" repeated 88 times]
b4,g,msb,xy         .. text: ["w" repeated 87 times]
b4,b,msb,xy         .. file: MPEG ADTS, layer I, v2, 112 kbps, 24 kHz, JntStereo
b4,rgb,msb,xy       .. text: ["w" repeated 12 times]
b4,bgr,msb,xy       .. text: ["w" repeated 12 times]
```
This gives us our flag `flag{l0v3ly_sup3r_b3st_3nc0d1ng}` and a username, `k4r5t_t0p0gr4phy`, to store for a later part of the competition.

### Robot Images
Unforunately, this challenge actually broke during the competition, so teams only got a partial flag. The challenge was to find the flag in the two images of a robot. Both images show the following robot:
![Robot](robots.png)

Using this command `cmp -l _robots.png chal.png | gawk '{printf "%08X %02X %02X\n", $1, strtonum(0$2), strtonum(0$3)}'` we can find the differences between the two images. This gives us the following output:
```
000437E1 1C 66
00047C41 3B 6C
0004C07F CD 61
0004D7F6 85 67
0005199F 66 7B
00056869 C2 35
00059665 5B 75
0005F418 D8 63
000614B6 64 68
00066C6C F0 5F
0006921B 4D 34
0006C56D 91 5F
000738E2 85 63
000745FB 3B 30
0007803E 6A 30
0007C0F6 FF 6C
00080058 3D 5F
00084A32 02 70
0008A15F F0 72
0008E8D5 2A 30
00091568 67 6A
0009636B 94 33
0009A75F 8D 63
0009CD2A CA 74
000A1A94 79 21
000A5913 25 21
000A9FBF 23 7D
000AE8C9 C2 70
000AFC4F 6D 61
000B2FCB ED 73
000B77FA 44 73
000BDFA5 FB 77
000BFF5D 32 6F
000C621B 01 72
000CA281 AC 64
000CC987 A9 3A
000D16D0 74 20
000D447E 78 79
000D7434 71 34
000DBF48 F5 7A
000E0F99 64 30
000E5462 B4 30
000E8466 6A 5F
000EB14C 7E 74
000EFBC1 A1 72
000F4BB6 7D 31
000F6800 5E 62
000FAD4E 96 75
000FF528 6C 74
00103D23 FA 34
00106E50 3A 72
0010BD7E 50 79
```

The bytes in the third column are the bytes that have been changed. Decoding these updated bytes as ASCII gives us the flag `flag{5uch_4_c00l_pr0j3ct!!}` and a password, `y4z00_tr1but4ry`, to use later.

### Long's Madlibs
This post from Long gives a new website to explore:

> I made my first website! Go check it out and let me know if you like it http://madlibs.chals.mcpshsf.com

This website is a madlibs game, where you can fill in the blanks and get a story. Because our input is reflected back to us, we should test for a [template injection attack](https://portswigger.net/web-security/server-side-template-injection). Trying the string `{{ 7 + 7 }}` confirms that this is a template injection attack and gives us the template language, Jinja2. Running this payload `{{request.application.__globals__.__builtins__.__import__('os')
.popen('ls').read()}}` gives us the files on the system:
```
flag.txt letter.txt main.py static templates 
```
Running `{{request.application.__globals__.__builtins__.__import__('os')
.popen('cat flag.txt').read()}}` gives us the flag: `flag{th1s_1s_a_t3mp14t3_f0r_fl4sk5_4nd_inj3ct1on5}`. We can also read the file `letter.txt` to get the following message:

> Dear Diary, I can't believe how upset I am right now. I asked Chance for some Latkes and he never responded! I was really looking forward to enjoying those crispy, delicious potato pancakes, and I was practically salivating at the thought of smothering them with sour cream and applesauce. Now, I'm sitting here in my kitchen, feeling sorry for myself, and hungry as can be. I can't stop thinking about those latkes, and how amazing they would have tasted if only I had been able to get my hands on some potatoes. It's not fair, really. I mean, who runs out of latkes? I know it's silly to get so worked up over something as simple as food, but I can't help it. I was really looking forward to those latkes, and now I'm just mad that I didn't get to enjoy them. I guess I'll just sulk in my room and try to forget about those delicious, crispy latkes that I missed out on. I might have to hit something if I don't get those latkes.

This is more evidence that Long is the murderer, as he is so mad at Chance that he would hit something. This could mean that he has a strong enough motive to kill Chance.

### Other Clues
First, looking at the comments on the Robot images, we find that someone stole Hubbz's pan:

> BRUH SOMEONE STOLE MY PAN OMG

This clears Hubbz as a suspect, as the murder weapon was stolen from him.

Lastly, a post from Karst gives a filesharing website, [htts://fileshare-flask.chals.mcpshsf.com](https://fileshare-flask.chals.mcpshsf.com). Using the username for the pan image, `k4r5t_t0p0gr4phy`, and the password from the robot images, `y4z00_tr1but4ry`. We can log in and look for more clues. 

## Chance's Blog
Before we look at the filesharing site, let's go back and investigate Chance's blog that he posted to Twitter.
### Lockpicking
On his blog, we see that Chance locked a key with a bike lock:

> I locked the key with a bike lock and I don’t know the combination :(

After visiting the HT230 Lab, we get access to a bike lock to crack. To pick this lock, we can use the gap between the rings of the bike lock to determine if a number is right or not. The step to pick are are:

1. Move through each number in the first ring, pulling the lock each time
2. The number that is right will have a noticeable gap between the rings
2. Repeat steps 1 and 2 for the second, third, and fourth rings.

Upon opening the bike lock, we get the following information:
```
flag{l33t_l0ckp1ck1ng_br0}
the key is ilovelatkesalot!
```
We get a new flag, `flag{l33t_l0ckp1ck1ng_br0}`, and a key, `ilovelatkesalot!`. We can use this key to decrypt the information the blog post.

### Unknown Encryption
On the same blog post where the bike lock is mentioned, Chance also mentions that he encrypted his data using the key he locked:

> The information is below, I think I used some sort of Advanced Encryption Algorithm.
> 1Pm08qXUT64euKHtq1cnN1Ig6yqbT2qWbcSyFnJxYW8MqwZmdGxNW/i5W
> +eI98T06iP3LBShWNX65XBBY74FNTp0CL2kOzGJzLSMJ1541XQ3g94VCBW0F
> xnAOB5VyP7hLmdSmTC65rHQmsgihW2GXTXicId27OOuUu/QFidbZ6M=

Chance mentions that he used an "Advanced Encryption Algorithm", which suggests that he used AES. We can use [CyberChef](https://cyberchef.org) to decrypt this data. Using the key from the Lockpicking Challenge, a random IV, and the mode `AES-256-CBC`, we get:
```
https://drive.google.com/file/d/1sLaQw-kMYGhexxUV12y09RJj_blVLzNz/view?usp=sharing 
flag{f0ll0w_th3_url!}
```
This gives us a flag  `flag{f0ll0w_th3_url!}` and a link to a Google Drive file. This file doesn't open but we can still download it. Using [HexEdit](https://hexed.it/), we can see that the file's header is corrupted. We can fix this by changing the first 4 bytes to `89 50 4E 47`. This allows us to open the image:
![KarstID](karst_id.png)

From this image, we can see that Karst is a private investigator. Therefore, he is probably not the murderer.

### Latke Recipe
From the blog, we also find this [word document](latke_recipe.docx). Opening this file gives us a warning, but we cam open it and get a recipe for latkes. Remembering that Docx files are just glorified zip files, we can rename this file to `latke_recipe.zip` and look for hidden contents. Inside the zip file, we find the flag: `flag{00h_l4tk3s!}`
![carving](docx_carving.png)

### SQL Log
The last post on Chance's blog gives us a log file of a site that Chance runs. Considering the earlier messages on Twitter, these logs are probably for the Secret Chat site. The logs look like this:
```shell
172.21.0.4 - - [14/Mar/2023:00:29:35 +0000] "GET /?user=%27%20ORDER%20BY%201--%20-&pass= HTTP/1.1" 200 224 "-" "Mozilla/5.0 (X11; U; Linux i686; es-ES; rv:1.8.1.2) Gecko/20070220 Firefox/2.0.0.2"
172.21.0.4 - - [14/Mar/2023:00:29:35 +0000] "GET /?user=%27%20ORDER%20BY%204608--%20-&pass= HTTP/1.1" 200 458 "-" "Mozilla/5.0 (X11; U; Linux i686; es-ES; rv:1.8.1.2) Gecko/20070220 Firefox/2.0.0.2"
172.21.0.4 - - [14/Mar/2023:00:29:35 +0000] "GET /?user=%27%20ORDER%20BY%2010--%20-&pass= HTTP/1.1" 200 458 "-" "Mozilla/5.0 (X11; U; Linux i686; es-ES; rv:1.8.1.2) Gecko/20070220 Firefox/2.0.0.2"
172.21.0.4 - - [14/Mar/2023:00:29:35 +0000] "GET /?user=%27%20ORDER%20BY%206--%20-&pass= HTTP/1.1" 200 458 "-" "Mozilla/5.0 (X11; U; Linux i686; es-ES; rv:1.8.1.2) Gecko/20070220 Firefox/2.0.0.2"
```
This indicates that a SQL Injection was carried out. In fact, this challenge was actually generated from a SQLmap attack. Looking towards the end of the log, we find that a timing attack was carried out:
```shell 
172.21.0.4 - - [14/Mar/2023:00:35:05 +0000] "GET /?user=%27%20AND%20
%28SELECT%207410%20FROM%20%28SELECT%28SLEEP%281-%28IF%28ORD%28MID%28
%28SELECT%20IFNULL%28CAST%28username%20AS%20NCHAR%29%2C0x20%29%20FROM
%20admin_site.users%20ORDER%20BY%20id%20LIMIT%201%2C1%29%2C8%2C1%29%29
%3E113%2C0%2C1%29%29%29%29%29OEDl%29%20AND%20%27ogSF%27%3D%
```
Cleaning this up and extracting the sql query we get:
```sql
AND (SELECT 7410 FROM (SELECT(SLEEP(1-(IF(ORD(MID((SELECT 
IFNULL(CAST(username AS NCHAR),0x20) FROM admin_site.users 
ORDER BY id LIMIT 1,1),8,1))>113,0,1)))))OEDl) AND 'ogSF'=%
```
This query is checking if the the 8th character of the username is greater than 113. If it is, it will sleep for 1 second. Decoding more of the logs, we see that the attack checks if a character is greater than a number. Then, it decreases that number until the character is found. After that, the attack confirms if its guess is correct by checking if it not equal to the character. By looking for any != signs in the logs, we can find the stolen information:
```python
from urllib.parse import unquote

with open('access.log', 'r') as f:
    lines = f.readlines()

decoded_data = ""
for line in lines:
    request_part = line.split(' ')[6]
    decoded_request = unquote(request_part)
    char_index = decoded_request.find('!=')
    if char_index != -1:
        temp = decoded_request[char_index+2:char_index+5]
        if(temp[-1] == ','):
            decoded_data += chr(int(temp[:-1]))
        else:
            decoded_data += chr(int(temp))
print(decoded_data)
```
This gives us the flag `flag{l33t_l0gs_br0}`, a username `chance`, and a password `mhm_p0t4t0es`. We can use these credentials to log into the Secret Chat site.

## Fileshare
Using the information (username `k4r5t_t0p0gr4phy` and password `y4z00_tr1but4ry`) retrived from Facebook earlier, we look at the files on the Fileshare.
### Encrypted Zip
We find a zipfile that is encrypted but we don't know the password. There is also a wordlist in the same directory, suggesting that the password is on the wordlist. Therefore, we can use [John The Ripper](https://www.openwall.com/john/) to crack the password using the wordlist:
```shell
zip2john evidence.zip > hash.txt
john hash.txt --wordlist=wordlist.txt
```
This gives us the password `mischance` which we can use to unzip the file. Inside, we find a file called `ChanceEssay.pdf` which has the flag `flag{h3_r34lly_turn3d_th4t_1n_t0_st4nf0rd}`. We also find the file `evidence.txt` which contains the following:

> Good riddance! Chance deserved to go! Why couldn’t he just give me latkes? Who needs to be so protective of latkes?!?!? If he had just given me latkes in the first time, he would still be here. But how am I supposed to get my latkes now??? Maybe I’ll bug CornCob some more. If he doesn’t agree...

This is a clear confession from the murderer. It also clears Corncob, as the murderer want to "bug" Corncob. The killer is likely Long, as the motives in this file align with Long's motives. In this folder, we also find some pictures of Chance. So sad to see him go :(

![Chance](chance_profile.png)

### Spectrogram
There is also a wav file on the Fileshare. Playing the file hurts your ears and doesn't give any info, so let's try looking at it's spectrogram. The spectrogram is a way to hide messages in an audio file. Opening the file in [Sonic Visualizer](https://sonicvisualiser.org/), we get this spectrogram:

![Spectrogram](spectrogram.png)

This gives us the flag `flag{mus1c_m4j0r5_c4n_h4ck_t00}`

### PCAP Logins
Another file on the Fileshare is `login.pcap`. To analyze it, we can open it in [Wireshark](https://www.wireshark.org/). Looking at the HTTP request, we see a lot of 401 Unauthorized responses. However, there is one 200 OK response and clicking 'Follow Stream' on this response gives us a username and password:

```
username=long&password=gonl321!!!&666c6167=666c61677b62797465735f6f7665725f7468655f776972657d
```
There is also a hexstring at the end of request. Decoding this hexstring gives us the flag `flag{bytes_over_the_wires}`. Trying this username and password on all the websites we have found so far, we can log into the Twitter as Long. 

#### Twitter pt. 2 
Inside Long's DMs we find that he is begging for latkes from Corncob.

> yo CornCob where are my latkes. CORNCOB GIMME YOUR LATKES

This again shows why Long likely killed Chance; he didn't give Long his latkes. We also find that he sent a picture to Hubbz showing himself on vacation.

![vacation](vacation.jpg)

Using `exiftool` to analyze this image further, we get the following output:

```
ExifTool Version Number         : 12.40
File Name                       : vacation.jpg
Directory                       : .
File Size                       : 58 KiB
File Modification Date/Time     : 2023:03:25 22:58:53-04:00
File Access Date/Time           : 2023:03:25 23:01:20-04:00
File Inode Change Date/Time     : 2023:03:25 22:58:53-04:00
File Permissions                : -rwxrwxrwx
File Type                       : JPEG
File Type Extension             : jpg
MIME Type                       : image/jpeg
JFIF Version                    : 1.01
Exif Byte Order                 : Big-endian (Motorola, MM)
X Resolution                    : 144
Y Resolution                    : 144
Resolution Unit                 : inches
Artist                          : ZmxhZ3t3aDR0JzVfMW5fdGgzX2wwYzR0MTBuP30=
User Comment                    : Screenshot
Exif Image Width                : 998
Exif Image Height               : 560
GPS Version ID                  : 0.0.0.1
GPS Latitude Ref                : Unknown (E)
GPS Longitude Ref               : Unknown (S)
Image Width                     : 998
Image Height                    : 560
Encoding Process                : Baseline DCT, Huffman coding
Bits Per Sample                 : 8
Color Components                : 3
Y Cb Cr Sub Sampling            : YCbCr4:2:0 (2 2)
Image Size                      : 998x560
Megapixels                      : 0.559
GPS Latitude                    : 19 deg 54' 36.96" N
GPS Longitude                   : 155 deg 35' 56.17" E
GPS Position                    : 19 deg 54' 36.96" N, 155 deg 35' 56.17" E
```

Again, there is a base64 string in the Artist field. Decoding this gives us the flag `flag{wh4t'5_1n_th3_l0c4t10n?}`. This is a hint that we should look at the location of the image. Using [Google Maps](https://www.google.com/maps), we can find the location of the image.

![Location](location.png)

This is in the middle of the ocean, which shows that Long is lying about being on vacation. Therefore, it is still possible that he is the murderer.

### Broken PNG
Lastly, we find a photo that won't open. Downloading the file and opening it in [HexEdit](https://hexed.it/), we find that the first byte of the file is not `89`, which is required by the PNG standard. Fixing this and saving the file gives us this image:

![fingerprints](fingerprints.png)

This image gives us the flag `flag{4rch35_l00p5_wh0rl5}` and some fingerprints. These can be used with the fingerprint found on the pan that we got earlier. By comparing the fingerprints, we can confirm that Long is the murderer.

![long finger](long_finger.png)
![pan finger](pan_finger.png)

## Virtual Machine
On the Fileshare site, we also find a tarfile of a Virtual Machine. Inside this VM, we find two zip files: `history-backup.zip` and `git-backup.zip`.
### Chrome History
Unzipping `history-backup.zip` gives us the history of a Chrome browsing session. Using [this tool](https://www.nirsoft.net/utils/chrome_cache_view.html), we can look at all the URLs in the browser cache. Looking through the urls, we find this link to some images: [https://imgur.com/a/6pVCTsY](https://imgur.com/a/6pVCTsY). This again proves that Long is the killer, as he is literally swinging the pan at Chance. 

![pan_swing](pan_swing.jpeg)

### Git Repo
We also find a git repo in `git-backup.zip`. Opening the directory and listing all the files shows nothing. However, if we run `git log --graph --decorate --pretty=oneline --abbrev-commit`, we find that there were a lot of updates to `flag.txt` and then the file was deleted. 

![updates](updates.png)

Using `git checkout` to look at the previous commits, we see that the information is split up into different commits. By going through each commit, we can get the flag `flag{g1t_r34ss3mbly}` and a confession from Long.

> In case you didn't know, I did it >:) --Long

This proves what our previous evidence hinted at: Long murdered Chance for not giving him latkes.

## Secret Chat
After getting Chance's credentials from the log file on his blog (username: `chance`, password: `mhm_p0t4t0es`), we can log into the [secret chat](https://secret-chat.chals.mcpshsf.com/). This chat appears to be a group conversation between various members of the Latke Cartel. They appear to be angry at chance for not selling enough latkes.

> you need to up your latkes sales
> the cartel is LOSING money!!!

While this makes the other cartel members suspicious, we should look further through the chat to see if they have enough motive to kill Chance.
### Invisible Message
Looking through the chat, we find this message:

> Nulla pellentesque dignissim enim sit amet venenatis urna cursus eget. Aliquam purus sit amet luctus venenatis lectus. Pellentesque habitant morbi tristique senectus et netus et. Faucibus a pellentesque sit amet. Aliquet bibendum enim facilisis gravida neque convallis a. Ut placerat orci nulla pellentesque. Nisi vitae suscipit tellus mauris a diam maecenas sed enim. Hac habitasse platea dictumst quisque sagittis. Tempor orci dapibus ultrices in iaculis nunc sed. A scelerisque purus semper eget.

This message doesn't seem to contain any information, but if we copy and paste and it into [HexEdit](https://hexed.it/), we can see that there are invisible characters at the end of the message. 

![inivisible.png](invisible.png)

In particular, two invisible characters appear at the end of the message: `E1 9E B5` and `E1 A0 8E`. This indicates that a message was encoded in binary. We can convert the first invisible character to a 0 and the second to a 1, and then convert the binary to ASCII to get the flag. This can be done through this script:

```python
with open("invisible.txt", "rb") as f:
    text = f.read().decode("utf-8")
text_chars = list(text)
binary_chars = ""
for char in text_chars:
    if ord(char) == 6069:
        binary_chars += "0"
    elif ord(char) == 6158:
        binary_chars += "1"

binary_strings = [binary_chars[i:i+8] for i in range(0, len(binary_chars), 8)]
for binary_string in binary_strings:
    print(chr(int(binary_string, 2)), end="")
```

Pasting the message into `invisible.txt` and running the script nets us the flag `flag{b00_im_a_gh0st_4nd_y0u_c4nt_s33_m3}` and Bob's secret message:

> chance is so stupid lololol. probably shouldn't even been in this cartel tbh. but i still love him bc he's so nice <3

This clears up the mystery of why Bob was so angry at Chance. He was angry because Chance was stupid and didn't sell enough latkes. This is not enough to kill Chance, however, as Bob still cared about him.

### Keyboard PCAP

Scrolling further through the chat, we also find a link to a [pcap file](http://chal-host.chals.mcpshsf.com/keylog.pcap). Upon opening this file in [Wireshark](https://www.wireshark.org/), we can see that there are a lot of USB packets.

![pcap](usb_packets.png)

Looking at an individual packet, we can see that keystrokes were sent. We can even see that the first key pressed was a capital `D`, as the d key and the shift key were pressed.

![keystroke](keystroke.png)

We could go through each packet and try to figure out what was typed, but this would take a long time. Instead, let's write a script to do it for us. First, let's extract all the usb payloads using tshark.

```
tshark -r keylog.pcap -T fields -e usbhid.data > usb_payloads.txt
```

Then, we can write a script to convert the payloads to ASCII.

```python
with open("usb_payloads.txt", "r") as f:
    lines = f.readlines()

mapping = {
    '04': ('a', 'A'), 
    '05': ('b', 'B'), 
    '06': ('c', 'C'), 
    '07': ('d', 'D'), 
    '08': ('e', 'E'), 
    '09': ('f', 'F'), 
    '0a': ('g', 'G'), 
    '0b': ('h', 'H'), 
    '0c': ('i', 'I'), 
    '0d': ('j', 'J'),
    '0e': ('k', 'K'), 
    '0f': ('l', 'L'), 
    '10': ('m', 'M'), 
    '11': ('n', 'N'),
    '12': ('o', 'O'),
    '13': ('p', 'P'),
    '14': ('q', 'Q'),
    '15': ('r', 'R'),
    '16': ('s', 'S'),
    '17': ('t', 'T'),
    '18': ('u', 'U'),
    '19': ('v', 'V'),
    '1a': ('w', 'W'),
    '1b': ('x', 'X'),
    '1c': ('y', 'Y'),
    '1d': ('z', 'Z'), 
    '1e': ('1', '!'), 
    '1f': ('2', '@'), 
    '20': ('3', '#'), 
    '21': ('4', '$'), 
    '22': ('5', '%'), 
    '23': ('6', '^'), 
    '24': ('7', '&'), 
    '25': ('8', '*'), 
    '26': ('9', '('), 
    '27': ('0', ')'), 
    '28': ('\n', '\n'), 
    '29': ('[ESC]', '[ESC]'), 
    '2a': ('[BACKSPACE]', '[BACKSPACE]'), 
    '2b': ('\t', '\t'), 
    '2c': (' ', ' '), 
    '2d': ('-', '_'), 
    '2e': ('=', '+'), 
    '2f': ('[', '{'), 
    '30': (']', '}'), 
    '31': ('\\', '|'), 
    '32': ('`', '~'),
    '33': (';', ':'), 
    '34': ("'", '"'),
    '36': (',', '<'), 
    '37': ('.', '>'), 
    '38': ('/', '?'), 
    '39': ('[CAPSLOCK]', '[CAPSLOCK]')
}

message = ''
for line in lines:
    stripped_line = line.strip('\n')
    if len(stripped_line) == 0 or stripped_line == '0000000000000000':
        continue
    caps = 0
    if stripped_line[1] == '2':
        caps = 1
    decoded_stroke = mapping[stripped_line[4:6]][caps]
    if(decoded_stroke == '[BACKSPACE]'):
        message = message[:-1]
    else:
        message += decoded_stroke
print(message)
```

Running this script gives us the following message:

> Dear Chance, I really miss you. I know you're dead and can't read this but I just wanted to tell you how I feel. I'm sorry if I ever made you feel like a bad friend. You were one my BFFs and it's going to be really hard without you. From, corncob
> flag{b3_c4r3ful_0f_wh4t_y0u_typ3...}

What Corncob typed further proves that he is not the murderer. He feels grief over Chance's death and actually misses Chance. We also got another flag from this message: `flag{b3_c4r3ful_0f_wh4t_y0u_typ3...}`

### Memory Dump
Nick says he was drawing something when his computer crashed. He then took this [memory dump](https://drive.google.com/file/d/1Twp_wsiyxExlnY7qKvWnJh0w2qRQ4wND/view). First, let's determine what processes were running with [Volatility3](https://github.com/volatilityfoundation/volatility3). Running the command `python vol.py -f memory.dmp windows.pslist.PsList` gives us this list of processes:

```
PID     PPID    ImageFileName   Offset(V)       Threads Handles SessionId       Wow64   CreateTime      ExitTime       File output

4       0       System  0x84133188      84      488     N/A     False   2023-03-11 02:06:11.000000      N/A     Disabled
228     4       smss.exe        0x919b1140      2       29      N/A     False   2023-03-11 02:06:11.000000      N/A    Disabled
300     292     csrss.exe       0x85cbf3a0      9       370     0       False   2023-03-11 02:06:12.000000      N/A    Disabled
348     292     wininit.exe     0x841ae1d8      3       76      0       False   2023-03-11 02:06:13.000000      N/A    Disabled
360     340     csrss.exe       0x841ae860      8       185     1       False   2023-03-11 02:06:13.000000      N/A    Disabled
400     340     winlogon.exe    0x85cd4d20      3       115     1       False   2023-03-11 02:06:13.000000      N/A    Disabled
444     348     services.exe    0x85ce4558      10      213     0       False   2023-03-11 02:06:13.000000      N/A    Disabled
452     348     lsass.exe       0x85ce6628      7       560     0       False   2023-03-11 02:06:13.000000      N/A    Disabled
460     348     lsm.exe 0x85ce8650      10      141     0       False   2023-03-11 02:06:13.000000      N/A     Disabled
564     444     svchost.exe     0x85d349e0      10      352     0       False   2023-03-11 02:06:13.000000      N/A    Disabled
632     444     svchost.exe     0x93dc8bf8      7       252     0       False   2023-03-11 02:06:13.000000      N/A    Disabled
684     444     svchost.exe     0x85cd5770      18      474     0       False   2023-03-11 02:06:13.000000      N/A    Disabled
804     444     svchost.exe     0x85da2a38      13      311     0       False   2023-03-11 02:06:14.000000      N/A    Disabled
844     444     svchost.exe     0x85db1280      13      331     0       False   2023-03-11 02:06:14.000000      N/A    Disabled
888     444     svchost.exe     0x85dbf030      35      945     0       False   2023-03-11 02:06:14.000000      N/A    Disabled
940     684     audiodg.exe     0x85d5e030      5       120     0       False   2023-03-11 02:06:14.000000      N/A    Disabled
1108    444     svchost.exe     0x85e12510      19      498     0       False   2023-03-11 02:06:15.000000      N/A    Disabled
1204    444     spoolsv.exe     0x85e81510      13      268     0       False   2023-03-11 02:06:15.000000      N/A    Disabled
1240    444     svchost.exe     0x85e86030      19      321     0       False   2023-03-11 02:06:15.000000      N/A    Disabled
1324    444     svchost.exe     0x85e72030      10      145     0       False   2023-03-11 02:06:16.000000      N/A    Disabled
1608    444     svchost.exe     0x8551a568      6       91      0       False   2023-03-11 02:06:17.000000      N/A    Disabled
1940    444     taskhost.exe    0x84bda030      9       246     1       False   2023-03-11 02:06:44.000000      N/A    Disabled
1984    804     dwm.exe 0x8557f250      3       71      1       False   2023-03-11 02:06:44.000000      N/A     Disabled
2000    1976    explorer.exe    0x85581d20      24      778     1       False   2023-03-11 02:06:44.000000      N/A    Disabled
980     444     SearchIndexer.  0x85d92d20      13      623     0       False   2023-03-11 02:06:51.000000      N/A    Disabled
284     444     wmpnetwk.exe    0x86072ab8      9       207     0       False   2023-03-11 02:07:01.000000      N/A    Disabled
1280    444     svchost.exe     0x85eeea68      14      200     0       False   2023-03-11 02:07:01.000000      N/A    Disabled
3128    444     mscorsvw.exe    0x85e9b468      6       76      0       False   2023-03-11 02:08:17.000000      N/A    Disabled
3152    444     sppsvc.exe      0x8612ed20      4       139     0       False   2023-03-11 02:08:17.000000      N/A    Disabled
3192    444     svchost.exe     0x84bddaf0      12      341     0       False   2023-03-11 02:08:17.000000      N/A    Disabled
2548    444     msiexec.exe     0x84566d20      5       273     0       False   2023-03-11 02:13:45.000000      N/A    Disabled
2024    2000    mspaint.exe     0x84260b70      7       143     1       False   2023-03-11 02:20:20.000000      N/A    Disabled
1548    444     svchost.exe     0x8451b9b0      7       105     0       False   2023-03-11 02:20:20.000000      N/A    Disabled
```

Looking through these processes, mspaint appears to be what Nick was drawing in. Let's examine the process by extracting it from the memory dump. We can do this with this command: ` python vol.py -f memory.dmp windows.memmap.Memmap --pid 2024 --dump`. This will create a file called `pid.2024.dmp` in the current directory. 

We can then use [Gimp](https://www.gimp.org/) to extract what Nick was drawing. Renaming the file to `pid.2024.data` and opening it in Gimp, we can adjust the offset, width, and height until we get a viewable image. In this case, an offset of 10652870, width of 960, and height of 350 works.

![gimp](gimp.png)

Cropping and the flipping the image vertically, we get the following painting:

![painting](painting.png)

This gives us the flag `flag{wh0_us3s_w1nd0ws7??}` and some more information about the Nick. He was drawing a heart for Chance, showing that he cared about him. This means that Nick likely did not murder Chance.

## Conclusion

Based on all of the evidence, Long is clearly the murderer. Chance's cartel members don't have enough motive to kill him, and actualy cared about him. While Corncob has some motive, there is more evidence suggesting Long was the murderer. Also, Corncob actually feels grief over Chance's death. Long was angry at Chance for not giving him latkes, as shown by his diary and posts on Twitter. His fingerprints line up with the fingerprints on the murder weapon, there is a written confession, and picture of Long murdering Chance. All of these details prove that Long murdered Chance with a pan.
