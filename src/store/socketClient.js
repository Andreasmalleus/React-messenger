import io from "socket.io-client";

const host = 'http://localhost:3000/'

export default class SocketApi{

    socket;

    connect = (token) => {
        this.socket = io.connect(host, {query : "token="+token})
        return new Promise((resolve, reject) => {
            this.socket.on('connect', () => resolve());
            this.socket.on('connect_error', (err) => reject(err));
        })
    }

    disconnect = () => {
        return new Promise((resolve) => {
            this.socket.disconnect(() => {
              this.socket = null;
              resolve();
            });
        });
    }

    emit = (event, data) => {
        return new Promise((resolve, reject) => {
            if(!this.socket){
                return reject("Socket is not connected");
            }
            return this.socket.emit(event, (data), (err, response) => {
                if(err){
                    return reject(err);
                }
                return resolve(response);
            });
        });
    }

    on = (event, fun) => {
        return new Promise((resolve,reject) => {
            if(!this.socket){
                return reject("Socket is not connected")
            }
            this.socket.on(event, fun);
            resolve();
        })
    }
}