This is a React Node Website that uses Modernize-react. 

### Set-up Instructions 
* Download repo. 
    - Download repository from github repo

        -- OR --
   
    - Open Terminal and Navigate to folder that will contain repo. e.g /home/code/
    - type `git clone https://github.com/alfa2267/alfa2267.github.io.git`

* Set-up repo
    - In terminal, Navgate to root of repo folder. The file npm config file package.json should exist here. Can do `ls -la` to check. 
    - type `npm i` to install packages from package.json (this only needs to be done if new packages have been added or package.json has been updated).
    - To run local server, use :
            `npm run start`
      
* Deploying to github.io
    - To deploy website, type `npm run deploy` in terminal. This will build your static website and assets, 
      and then deploy them and update the gh-pages branch of your repositiory which will update the website.  

* For wesbiste, make sure in github repo .io settings the correct branch is being pointed to ( i.e gh-pages )
* Make sure to update this branch, as it is the actual code branch, while gh-pages is just the deployed build folder to serve to github.io domain.
* gh-pages branch should only be updated through running command `npm run deploy`, which leverages gh-pages node package.

* Sugessted workflow.
   - Local server updates automatically after changes in code. If you have autosave in vscode, this means changes are reflected as soon as you stop typing.
   - So Work locally with local server, viewing changes in browser. 
   - when changes are finalised, `npm run deploy` and check if it's all good live.
   - If changes look good on .io domain, at this point you can go ahead and commit and update this repo with your changes.

This way simply discarding all uncommited changes in editor, and running `npm run deploy` after will reset your live site back. 

Here's an example of Live demo using Modernize React : <a href="https://modernize-react-free.netlify.app/dashboard">Live Demo</a>
