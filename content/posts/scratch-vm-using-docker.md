---
title: "Scratch Vm Using Docker"
date: 2022-12-17T23:40:07-06:00

tags:
- docker
- neovim
- nerdliness
---
After watching [0 to LSP: Neovim RC From Scratch](https://www.youtube.com/watch?v=w7i4amO_zaE "0 to
LSP: Neovim RC From Scratch") I wanted to experiment with my own Neovim configuration. Fortunately,
someone tweeted a very nice way to have a scratch environment, totally separate from your current
Neovim configuration, for experimentation.

{{< tweet user="vure89" id="1603830153867513857" >}}

Start by creating a scratch directory on your host machine. Then using that directory run this
command:

    docker run -it --rm -v {$PWD}:/root/.config/nvim -w /root/.config/nvim --net host alpine sh

After the image is started, run

    apk add neovim neovim-doc

to install Neovim and its documentation.

The Docker instance will start surprisingly quickly, and since it is mapped to a directory on your
host machine, the configuration you make will be saved. I can see myself using this pattern for
other experiements.
