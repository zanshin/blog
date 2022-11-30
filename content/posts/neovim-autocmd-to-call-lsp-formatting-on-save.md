---
title: "Neovim Autocmd to Call Lsp Formatting on Save"
date: 2022-11-29T17:11:16-06:00

tags:
- neovim
- nerdliness
---
Recently I added this autocmd to my Neovim configuration, to format Go language code when the buffer
was saved.

{{< highlight lua >}}
acmd({ "BufWritePre" },
     { pattern = "*.go",
       callback = function()
         vim.lsp.buf.format()
       end,
       group = _go})
{{< / highlight >}}

The `vim.lsp.buf.format()` call executes the LSP provided formatter for buffer being written. By
having it tied to Go language (`.go`) files I was missing out on formatting of other languages.

Today I moved that autocmd to the general section of my `autocmd.lua` file, and set the pattern to
be `*`, so that it would work for all languages.

{{< highlight lua >}}
acmd({ "BufWritePre" },
  { pattern = "*",
    callback = function()
      vim.lsp.buf.format()
    end,
    group = _general })
{{< / highlight >}}

Now when I save a buffer, whether it is Go program, or Rust, or even the Lua code in my Neovim
configuration, it gets formatted.
