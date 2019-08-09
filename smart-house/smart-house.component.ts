import { Component, OnInit } from '@angular/core';

interface IDevice {
  status: boolean;
  name: string;
  type: string;
}

interface IRoom {
  name: string;
  photo: string;
  devices: Array<IDevice>;
}

interface ISmartHouse {
  rooms: Array<IRoom>;
}
class Device implements IDevice {
  constructor(public name: string, public type: string) {}
  status = false;
  turnOn = function() {
    this.status = true;
  };
  turnOff = () => {
    this.status = false;
  };
  value = function() {
    if (!this.status) return 0;
    switch (this.type) {
      case 'Temperature':
        return Math.floor(Math.random() * (50 + 30 + 1) - 30.0);
      case 'Light':
        return Math.floor(Math.random() * (100 - 0 + 1) + 0);
      case 'Motion':
      case 'Sound':
        return Math.floor(Math.random() * 100) / 100;
      case 'Vibration':
        return Math.floor(Math.random() * (10 - 0 + 1) + 0);
    }
  };
}

class Room implements IRoom {
  constructor(public name: string, public photo: string) {}
  devices = [];
  deviceCount = () => this.devices.length;
  addDevice = (x: IDevice) => this.devices.push(x);
}
class SmartHouse implements ISmartHouse {
  rooms = [];
  addRoom = (x: IRoom) => this.rooms.push(x);
  removeRoom = (NameOfRoom: string) => {
    let i: number = this.rooms.indexOf(
      this.rooms.filter((x) => x.name == NameOfRoom)[0]
    );
    if (i > -1) this.rooms.splice(i, 1);
  };
  interval: any;
  startMonitoring = () => {
    this.interval = setInterval(() => {
      this.rooms.forEach((room: any) => {
        console.log(room.name + ' room');
        room.devices.forEach((device: any) =>
          console.log(device.name, device.value())
        );
      });
    }, 2000);
  };
  stopMonitoring = () => {
    clearInterval(this.interval);
  };
}
@Component({
  selector: 'app-smart-house',
  templateUrl: './smart-house.component.html',
  styleUrls: ['./smart-house.component.scss'],
})
export class SmartHouseComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}

// let device = new Device('First', 'Light');
// let device2 = new Device('Second', 'Temperature');
// let device3 = new Device('Third', 'Light');
// let device4 = new Device('Fourth', 'Temperature');
// let room = new Room('Living', 'plan');
// let room2 = new Room('Bedroom', 'plan');
// let smartHouse = new SmartHouse();
// device.turnOn();
// device2.turnOn();
// device3.turnOn();
// device4.turnOn();
// room.addDevice(device);
// room.addDevice(device2);
// room2.addDevice(device3);
// room2.addDevice(device4);
// smartHouse.addRoom(room);
// smartHouse.addRoom(room2);
// smartHouse.startMonitoring();
// setTimeout(function() {
//   smartHouse.stopMonitoring();
// }, 5000);
