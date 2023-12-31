# keronoteui

<div align="center" style="margin: 30px;">
    <img src="./public/images/banner.jpg"  align="center" />
</div>
<br/>

This [refine](https://github.com/pankod/refine) project was generated with [superplate](https://github.com/pankod/refine).

## 🔗 Project Demo link

- [Netlify deploy](https://deft-pithivier-b4a203.netlify.app)

## About

### Description
We love flipnote animations, but the main problem is you need a nintendo ds for create those animations. So we tried to do a simple animation software having inspiration on those features from flipnote studio, but at the same time improving and adding more features like layer system and extended color palette.

### Participants

* mrgaturus
  * [Github](https://github.com/mrgaturus/)
  * [Twitter](https://twitter.com/mrgaturus/)
  
* JuanViverosDev
  * [Github](https://github.com/JuanViverosDev)
  * [Twitter](https://twitter.com/HyperCreat50006/)
  
* GregoryInnovo
  * [Github](https://github.com/gregoryInnovo/)
  * [Twitter](https://twitter.com/GregoryInnovo/)

### Preview

## Pages
[Demo Video](https://youtu.be/OQgcjSWuvxE)
## Create animations
[Demo Video](https://youtu.be/ckomzCd_QL8)
## View animations
[Demo Video](https://youtu.be/NyO1v3tqjBc)
## Login
<div align="left">
    <img src="./public/images/login.PNG" style="width:100%;" alt="login">
</div>

## Profile
<div align="left">
    <img src="./public/images/profile.PNG" style="width:100%;" alt="login">
</div>

## Community creations
<div align="left">
    <img src="./public/images/community_creations.PNG" style="width:100%;" alt="community_creations">
</div>

## View details
<div align="left">
    <img src="./public/images/focus_canvas.PNG" style="width:100%;" alt="focus_canvas">
</div>

## Canvas
<div align="left">
    <img src="./public/images/canvas.PNG" style="width:100%" alt="canvas">
</div>

## Tools
<div align="left">
    <img src="./public/images/tools.PNG" style="width:100%" alt="tools">
    <img src="./public/images/tools2.PNG" style="width:100%" alt="tools2">
    <img src="./public/images/tools3.PNG" style="width:100%" alt="tools3">
    <img src="./public/images/toolidk.PNG" style="width:100%" alt="toolidk">
</div>


### Set up Project

### Prerequisites

- Supabase account
- Cloudinary account
- node >=18
- npm


### Install Project

- Clone the repository:
```
git clone https://github.com/Media-Collab/keronoteui.git
```

- Change directory and install dependencies:

```
cd directory
npm install
```

- Create `.env` file to save the blobs:

```
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_UPLOAD_PRESET=
```

- Create your cloudinary account
<div align="left">
    <img src="./public/images/console_cloudinary.PNG" style="width:100%;" alt="cloudinary console">
</div>

After create a product environment and appear in the console (section Programmable Media) copy the Cloud Name, API Key and API Secret.


- Go to the settings and create a preset (Make sure the mode is Unsigned)
<div align="left">
    <img src="./public/images/console_preset.PNG" style="width:100%;" alt="cloudinary preset">
</div>

In the creation you can select which folder the images will stored (in this case we create a folder called next)

- Folders fullied
<div align="left">
    <img src="./public/images/console_folders.PNG" style="width:100%;" alt="cloudinary folders">
</div>

- Create your supabase account
<div align="left">
    <img src="./public/images/supabase_console.PNG" style="width:100%;" alt="supabase console">
</div>
In this case we are going to use Database and Authentication

- Create animations tables with the following rows
<div align="left">
    <img src="./public/images/supabase_table.PNG" style="width:100%;" alt="animation table">
</div>

- And create a view to get the data that we want
<div align="left">
    <img src="./public/images/supabase_view.PNG" style="width:100%;" alt="animation table">
</div>

- Run in development mode:

```
npm run dev
```

## Learn More

To learn more about **refine**, please check out the [Documentation](https://refine.dev/docs)

- **Cloudinary API** [Docs](https://cloudinary.com/documentation/image_upload_api_reference#overview)
- **Supabase Data Provider** [Docs](https://refine.dev/docs/core/providers/data-provider/#overview)
- **Material UI** [Docs](https://refine.dev/docs/ui-frameworks/mui/tutorial/)
- **Inferencer** [Docs](https://refine.dev/docs/packages/documentation/inferencer)
- **i18n** [Docs](https://refine.dev/docs/core/providers/i18n-provider/)

## Future?
- Development of likes system 👍
- Edit animations 🏃‍♂️ 🖌
- Delete creations ❌
- Discover the onion mode 🤔

## License

MIT
