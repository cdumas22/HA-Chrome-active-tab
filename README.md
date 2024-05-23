# HA-Chrome Tab Tracker

This is a browser extension to automate things on Homeassistant when you have a specific tab being displayed on your browser. I use it to help do personal time tracking at work.

## Installing the extension

### From source

To install the extension "from source", it's easy to do in Chrome. Just clone the project and go to Addons, Manage Extension, Load Unpacked. Then select the directory where you cloned this.

## Setting things up on HA

#### 1. Add the virtual switch

Go to Configuration, Helpers, click Add Helper, select Text
use something like name: chrome_active_tab, icon: mdi:chrome

#### 2. Get your API key

Go to your profile (hint: your name, the last element in the HA menu, below Configuration)
Create a Long Lived Access Token. The name isn't important. Copy the key

#### 3. Click the extension and set the required fields
- HA Host: your Homeassistant host, such as http://homeassistant.local:8123/ (or whatever your protocol, host, and port are)
- API Key: the api key you got in step 2.
- Device: the virtual text input you created in step 1, for the example provided it will be: text_input.chrome_active_tab

#### 4. Write an automation on Homeassistant to do things when the state of the entity matches a specific URL.

If you're using the Hyperion integration, make sure you enable the "led device" entity, which is the entity that turns LEDs on and off.
