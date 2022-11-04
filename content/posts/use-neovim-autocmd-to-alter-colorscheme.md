---
title: "Use Neovim Autocmd to Alter Colorscheme"
date: 2022-11-04T09:54:58-05:00

tags:
- neovim
- nerdliness
---
I'm currently using the [onedarkhc](https://github.com/pacokwon/onedarkhc.vim "onedarkhc")
colorscheme for Neovim. I like nearly everything about it, except for the default `comment` color.
Out of the box it uses a very faint grey that I find hard to read against a dark (black) background.

To change the color I'm using an `autocmd` to override the highlight color for comments.

{{< highlight lua >}}
local _general = agrp("_general", { clear = true })

acmd({ "ColorScheme" },
      { pattern = "*",
        callback = function()
          vim.api.nvim_set_hl(0, "Comment", { fg = "Grey63" })
        end,
        group = _general })
{{< / highlight >}}

`agrp` and `acmd` are local functions that wrapper `vim.api.nvim.create_group` and
`vim.api.nvim.create_autocmd` respectively.

Finding a color I liked actually took longer to accomplish than creating the autocmd.
