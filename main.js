const electron = require('electron');
const { app , Menu , nativeImage, dialog, shell } = electron;  // Module to control application life.
const { BrowserWindow }  = electron;  
const path = require('path');

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';


let  win;
function createWindow()
{
    win = new BrowserWindow( { width:1200,height:900,resizable:true,frame:false,transparent: false, hasShadow: true, webPreferences: {
        experimentalFeatures: true,
        nodeIntegration: true,
        webSecurity: false
      } } );
    win.loadURL( `http://localhost:3000/index.html` );
    win.on( 'close' , (e)=>
    {
        var choice = dialog.showMessageBox(
            win,
            {
                type: 'question',
                buttons: ['是', '否'],
                title: '退出确认',
                message: '确定关闭编辑器？'
            });
        
        if( choice === 0 ) win=null;
        else e.preventDefault();
        
        //if(window.confirm( "确定关闭编辑器？" )) win=null;
    }  );

    win.webContents.on("new-window", function(event, url) 
    {
        event.preventDefault();
        shell.openExternal(url);
    });
    
}

app.on( 'ready' , ()=>{
    createWindow();
});

// app.commandLine.appendSwitch('js-flags', '--max-old-space-size=40960');
app.on('window-all-closed', () => {
    app.quit()
})
