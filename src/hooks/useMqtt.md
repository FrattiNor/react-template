## mqtt webpack v5 版本遇到的 node.js polyfill 问题

```
pnpm install url buffer process --save-dev
```

```
new webpack.ProvidePlugin({ url: 'url', process: 'process/browser', Buffer: ['buffer', 'Buffer'] })
```
