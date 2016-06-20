"use strict";

var HID = require("node-hid");

function ThunderConnector() {
  this.options = {
    vendorID  : 0x0a81,
    productID : 0x0701,
    left  : [ 4, 0, 0, 0, 0, 0, 0, 0],
    right : [ 8, 0, 0, 0, 0, 0, 0, 0],
    up    : [ 2, 0, 0, 0, 0, 0, 0, 0],
    down  : [ 1, 0, 0, 0, 0, 0, 0, 0],
    stop  : [32, 0, 0, 0, 0, 0, 0, 0],
    fire  : [16, 0, 0, 0, 0, 0, 0, 0]
  };
  this.messages = {
    connected     : "connected",
    notConnected  : "not connected",
    success       : "success",
    notSupported  : "not supported",
    errorNoDevice : "Cannot write to HID device"
  };
  this.decices = [];
  this.device = null;
}

ThunderConnector.prototype.connect = function() {
  var result = this.messages.notConnected;
  this.devices = HID.devices();
  this.device  = null;
  this.devices.forEach(function(element) {
    if(element.vendorId == this.options.vendorID && element.productId == this.options.productID) {
      this.device = new HID.HID(element.path);
      result = this.messages.connected;
    }
  }, this);
  return result;
};

ThunderConnector.prototype.command = function(command) {
  var result  = this.messages.success;
  var thunder = this;
  if(this.device == null && command !== "connect") {
    result = this.messages.notConnected;
  } else {
    try {
      switch(command) {
        case "connect":
          result = this.connect();
        break;
        case "stop":
          this.device.write(this.options.stop);
        break;
        case "left":
          this.device.write(this.options.left);
        break;
        case "right":
          this.device.write(this.options.right);
        break;
        case "up":
          this.device.write(this.options.up);
        break;
        case "down":
          this.device.write(this.options.down);
        break;
        case "fire":
          this.device.write(this.options.fire);
          setTimeout(function() {
            thunder.command("stop");
          }, 4.5 * 1000);
        break;
        default:
          console.error("Command '" + command + "' is not supported.");
          result = this.message.notSupported;
        break;
      }
    } catch(error) {
      if(error === this.messages.errorNoDevice) {
        this.device = null;
        result = this.messages.notConnected
      } else {
        console.error(error);
      }
    }
  }
  console.log("Executed command '" + command + "' with result '" + result + "'.");
  return result;
};

module.exports = new ThunderConnector();
