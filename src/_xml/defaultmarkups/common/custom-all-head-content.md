# Custom all-head-content

Custom `<b:include data='blog' name='all-head-content'/>`. Included in `src/theme.xml`.

```html
<b:include data='{
  socialImage: "https://example.com/1200x630.png",
  facebook: {
    appId: "replace_me"
  },
  twitter: {
    usernameSite: "@replace_me",
    usernameCreator: "@replace_me"
  }
}' name='custom-all-head-content'/>
```

| File | Description |
| --- | --- |
| `default.xml` | The standard metadata. |
| `facebook.xml` | Allows integration between Facebook and its user data and a website. By integrating Open Graph meta tags into your page's content, you can identify which elements of your page you want to show when someone share's your page. |
| `required.xml` | Set charset to `utf-8`. Add responsive viewport meta tag. |
| `title.xml` | The HTML `<title>` tag is used for declaring the title, or name, of the HTML document. The title is usually displayed in the browser's title bar (at the top). It is also displayed in browser bookmarks and search results. |
| `twitter.xml` | With Twitter Cards, you can attach rich photos, videos and media experiences to Tweets. Users who Tweet links to your content will have a "Card" added to the Tweet. |
