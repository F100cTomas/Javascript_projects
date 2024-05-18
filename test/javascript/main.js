let data = {
    "cam": {
        "X": 0,
        "Y": 0,
        "follow": [0, 1]
    },
    "zoom_treshold": 0.25,
    "floor": 0,
    "tilesize": 200,
    "zoom": 1,
    "keyboard": {
        "W": false,
        "A": false,
        "S": false,
        "D": false,
        "move1x": 0,
        "move1y": 0,
        "shift1": false,
        "up": false,
        "left": false,
        "down": false,
        "right": false,
        "move2x": 0,
        "move2y": 0,
        "shift2": false,
        "U": false,
    },/*
    "tilemap": [
        ["O","O","X","O","O","O","O","O","O","C","X","X","X","X","C","O","S","S","S","S","S","X","S","O"],
        ["O","O","X","X","O","O","O","O","O","X","I","I","I","I","X","O","O","O","O","O","X","X","S","O"],
        ["O","O","X","X","X","O","O","O","O","X","I","I","I","I","X","O","O","O","O","X","X","X","S","O"],
        ["O","O","X","X","X","X","O","O","O","W","I","I","I","I","W","O","O","O","X","X","X","X","S","O"],
        ["O","O","X","X","X","X","X","O","O","W","I","I","I","I","W","O","O","X","X","X","X","X","S","O"],
        ["X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X"],
        ["X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X"],
        ["X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X","X"],
    ],*/
    "collision_precision": 50,
    "tilemap": [
        ["X","O","O","O","X","O"],
        ["X","O","O","O","O","O"],
        ["X","O","O","O","O","O"],
        ["X","O","O","O","O","O"],
        ["X","O","O","O","O","O"],
        ["X","O","O","O","O","O"],
        ["X","O","O","O","O","O"],
        ["X","O","O","O","O","O"],
        ["X","O","O","O","O","O"],
        ["X","O","O","O","O","O"],
        ["X","O","O","O","O","O"],
        ["X","O","O","O","O","O"],
        ["X","H","H","H","O","O"],
        ["X","O","O","O","O","O"],
        ["X","O","O","O","O","O"],
        ["X","H","H","R","H","X"],
    ],
    "sprites":[
        {
            "name": "player",
            "index": 0,
            "color": "blue",
            "x": 1600,
            "y": 625,
            "width": 125,
            "height": 375,
            "xvel": 0,
            "yvel": 0,
            "physics": {
                "has_collision": true,
                "has_physics": true,
                "gravity": 1,
                "friction": 0,
                "is_grounded": true, 
            }
        },
        {
            "name": "player",
            "index": 1,
            "color": "red",
            "x": 3075,
            "y": 625,
            "width": 125,
            "height": 375,
            "xvel": 0,
            "yvel": 0,
            "physics": {
                "has_collision": true,
                "has_physics": true,
                "is_semisolid": true,
                "gravity": 1,
                "friction": 0,
                "is_grounded": true, 
            }
        },
        {
            "name": "o",
            "index": 2,
            "color": "orange",
            "x": 20000,
            "y": 0,
            "width": 100,
            "height": 100,
            "xvel": -10,
            "yvel": 0,
            "physics": {
                "has_collision": false,
                "has_physics": false,
                "is_semisolid": false,
                "gravity": 0,
                "friction": 0,
                "is_grounded": false, 
            }
        }
    ],
    "level_gen": {
        "floor": 15
    }
};
data.floor = data.tilemap.length * data.tilesize - data.floor;

let image = new Image();
image.src = "brick_texture.png"
let bg = new Image();
bg.src = "bg1.png"

let xflp = false;
let yflp = false;

let color = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
let canvas = document.getElementById("game");
let aspect_ratio;
let width;
let height;
let topx;
let topy;
resize();

let c = canvas.getContext("2d");
c.fillStyle = "red";

function rc() {
    let out = "#";
    for (let i =0; i < 6; i++) {
        out += color[Math.floor((Math.random() * 16))];
    }
    return out;
}

function resize() {
    width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
    height = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;

    canvas.width = width;
    canvas.height = height;

    topx = width/2;
    topy = height/2;

    aspect_ratio = width/height;
}

window.onresize = resize;

function conststr(char1, char2, leng, cutoff) {
    out = [];
    for (let j = 0; j < leng; j++) {
        if (j < cutoff) {
            out.push(char1);
        }else {
            out.push(char2);
        }
    }
    return out;
}

function stair_gen_up(leng) {
    let out = [];
    for (let i = 0; i < leng; i++) {
        let x = [];
        for (let j = 0; j < data.tilemap.length; j++) {
            if (i + j < data.level_gen.floor) {
                x.push("O");
            }else {
                x.push("X");
            }
        }
        out.push(x);
    }
    data.level_gen.floor -= leng;
    return out;
}
function stair_gen_down(leng) {
    let out = [];
    for (let i = 0; i < leng; i++) {
        let x = [];
        for (let j = 0; j < data.tilemap.length; j++) {
            if (j - i < data.level_gen.floor) {
                x.push("O");
            }else {
                x.push("X");
            }
        }
        out.push(x);
    }
    data.level_gen.floor += leng;
    return out;
}

function sect_gen() {
    let out = [];
    let leng = 2 + Math.floor((Math.random() * 3));
    switch (Math.floor(Math.random() * 5)) {
        case 0:
            if (data.level_gen.floor < 7) {
                out = stair_gen_down(leng);
            }else {
                out = stair_gen_up(leng);
            }
            break;
        case 1:
            out.push(conststr("O", "X", data.tilemap.length, data.level_gen.floor));
            for (let i = 0; i < 2; i++) {
                out.push(conststr("O", "I", data.tilemap.length, data.level_gen.floor));
                out[out.length - 1][data.tilemap.length - 1] = "R";
            }
            out.push(conststr("O", "X", data.tilemap.length, data.level_gen.floor));
            break;
        case 2:
            out = stair_gen_up(leng)
            for (let i = 0; i < 2; i++) {
                out.push(conststr("O", "I", data.tilemap.length, data.level_gen.floor + 1));
                out[out.length - 1][data.tilemap.length - 1] = "R";
            }
            data.level_gen.floor++;
            out = out.concat(stair_gen_down(leng));
            break;
        default:
            for (let i = 0; i < leng; i++) {
                out.push(conststr("O", "X", data.tilemap.length, data.level_gen.floor));
            }
            if (data.level_gen.floor < 0) {
                data.level_gen.floor = 0;
            }
            break;
    }
    return out;
}

function level_gen(sec_num) {
    for (let i = 0; i < sec_num; i++) {
        let out = sect_gen();
        out.forEach(column => {
            for (let j = 0; j < data.tilemap.length; j++) {
                data.tilemap[j].push(column[j]);
            }
        });
    }
}

function camera() {
    let maxx = " ";
    let maxy;
    let minx;
    let miny;
    data.cam.follow.forEach(e => {
        if (maxx === " ") {
            maxx = data.sprites[e].x + data.sprites[e].width/2;
            maxy = data.sprites[e].y + data.sprites[e].height/2;
            minx = maxx;
            miny = maxy;
        }else {
            maxx = Math.max(maxx, data.sprites[e].x + data.sprites[e].width/2);
            minx = Math.min(minx,  data.sprites[e].x + data.sprites[e].width/2);
            maxy = Math.max(maxy, data.sprites[e].y + data.sprites[e].height/2);
            miny = Math.min(miny, data.sprites[e].y + data.sprites[e].height/2);
        }
    });

    data.cam.X = (maxx + minx) / 2;
    data.cam.Y = (maxy + miny) / 2;

    let xdiff = maxx - minx;
    let ydiff = maxy - miny;
    
    let distsq = 1800 / Math.sqrt(xdiff * xdiff + 4 * ydiff * ydiff);

    if (distsq < 0.75) {
        data.zoom = distsq;
    }else {
        data.zoom = 0.75
    }
}

function background() {
    c.fillStyle = "black";
    c.drawImage(bg, 0, 0, width, height);
    let mult = Math.min(width/2000, height/1000);
    let tilesize = mult * data.tilesize * data.zoom+1;
    for (let i = 0; i < data.tilemap[0].length; i++) {
    for (let j = 0; j < data.tilemap.length; j++) {
    if (data.tilemap[j][i] != "O") {
        if (data.tilemap[j][i] == "X") {
            if (data.zoom < data.zoom_treshold){
                c.fillStyle = "gray";
            }
        }else if (data.tilemap[j][i] == "W") {
            c.fillStyle = "gray";
        }else if (data.tilemap[j][i] == "I") {
            c.fillStyle = "#202020";
        }else if (data.tilemap[j][i] == "C") {
            c.fillStyle = rc();
        }else if (data.tilemap[j][i] == "S") {
            c.fillStyle = "navy";
        }else if (data.tilemap[j][i] == "R") {
            c.fillStyle = "maroon";
        }else if (data.tilemap[j][i] == "H") {
            c.fillStyle = "firebrick";
        }else{
            c.fillStyle = data.tilemap[j][i];
        }
        if (data.tilemap[j][i] != "X" || data.zoom < data.zoom_treshold) {
            c.fillRect((i * data.tilesize - data.cam.X) * mult * data.zoom +topx, (j * data.tilesize - data.cam.Y) * mult * data.zoom +topy, tilesize, tilesize);
        }else {
            c.drawImage(image, (i * data.tilesize - data.cam.X) * mult * data.zoom +topx, (j * data.tilesize - data.cam.Y) * mult * data.zoom +topy, tilesize, tilesize);
        }
    }
    }
    }
    c.fillStyle = "gray";
    c.fillRect(0, (data.floor - data.cam.Y) * mult * data.zoom + topy, width, height);
}

function does_collide(e, element) {
    return (e.x < element.x + element.width && e.x + e.width > element.x) && (e.y < element.y + element.height && e.y + e.height > element.y);
}

function does_collide_block(x, y, w, h, element) {
    return (x < element.x + element.width && x + w > element.x) && (y < element.y + element.height && y + h > element.y);
}

function collide(is_x, x, y, w, h, element) {
    if (is_x) {
        if ((element.xvel > 0 && !xflp) || (element.xvel < 0 && xflp)) {
            element.x = x - element.width;
        }else if (element.xvel != 0) {
            element.x = x + w;
        }
        if (xflp) {
            xflp = false;
        }else {
            xflp = true;
            element.xvel /= -3;
            if (Math.abs(element.xvel) > 5) {
                element.xvel = 5 * Math.sign(element.xvel);
            }
        }
    }else {
        if ((element.yvel > 0 && !yflp) || (element.yvel < 0 && yflp)) {
            element.y = y - element.height;
            element.physics.is_grounded = true;
        }else if (element.yvel != 0) {
            element.y = y + h;
        }
        if (yflp) {
            yflp = false;
        }else {
            element.physics.yflp = true;
            element.yvel /= -3;
            if (Math.abs(element.yvel) < 1) {
                element.yvel = 0;
            }
            if (Math.abs(element.yvel) > 5) {
                element.yvel = 5 * Math.sign(element.yvel);
            }
        }
    }
}
function semisolid_collide(y, element) {
    element.y = y - element.height;
    element.physics.is_grounded = true;
    if (yflp) {
        yflp = false;
    }else {
        element.physics.yflp = true;
        element.yvel /= -3;
        if (Math.abs(element.yvel) < 1) {
            element.yvel = 0;
        }
        if (Math.abs(element.yvel) > 5) {
            element.yvel = 5 * Math.sign(element.yvel);
        }
    }
}

function collision(element) {
    let repx = true;
    let repy = true;
    let trvx = 0;
    let trvy = 0;

    while (repx || repy) {
    xflp = false;
    yflp = false;

    xog = element.x;
    yog = element.y;
    if (element.physics.is_grounded && element.yvel > -1) {
        element.yvel = 1;
    }
    element.physics.is_grounded = false;
    
    let is_x = false
    
    while (true) {
    if (is_x) {
        if (Math.abs(element.xvel) - trvx > data.collision_precision) {
            element.x += data.collision_precision * Math.sign(element.xvel);
            trvx += data.collision_precision;
        }else if (repx) {
            element.x += element.xvel % data.collision_precision;
            repx = false;
        }
    }else {
        if (Math.abs(element.yvel) - trvy > data.collision_precision) {
            element.y += data.collision_precision * Math.sign(element.yvel);
            trvy += data.collision_precision;
        }else if (repy) {
            element.y += element.yvel % data.collision_precision;
            repy = false;
        }
    }
    if (element.physics.has_collision) {
    data.sprites.forEach(e => {if ((e.name != element.name || e.index != element.index) && e.physics.has_collision && !(element.xvel == 0 && element.yvel == 0)) {
        if (does_collide(e, element)) {
            if (e.physics.is_semisolid || element.physics.is_semisolid) {
                if (!is_x && yog + element.height <= e.y) {
                    semisolid_collide(e.y, element);
                }
            }else {
                collide(is_x, e.x, e.y, e.width, e.height, element);
            }
        }
    }});}
    for (let i = Math.floor(element.y / data.tilesize); i <= Math.floor((element.y + element.height) / data.tilesize); i++) {
    for (let j = Math.floor(element.x / data.tilesize); j <= Math.floor((element.x + element.width) / data.tilesize); j++) {
        if (i >= 0 && j >= 0 && i < data.tilemap.length && j < data.tilemap[0].length) {
        let x = j * data.tilesize;
        let y = i * data.tilesize;
        if (data.tilemap[i][j] == "X" && does_collide_block(x, y, data.tilesize, data.tilesize, element)) {
            collide(is_x, x, y, data.tilesize, data.tilesize, element);
        }else if (!is_x && data.tilemap[i][j] == "S" && does_collide_block(x, y, data.tilesize, 0, element) && yog + element.height <= y) {
            semisolid_collide(y, element);
        }else if ((data.tilemap[i][j] == "R" || data.tilemap[i][j] == "H") && does_collide_block(x, y, data.tilesize, data.tilesize, element)) {
            if (!is_x) {
                if (element.yvel > 0) {
                    element.y = y - element.height;
                    if (data.tilemap[i][j] == "R" || Math.abs(element.yvel) < 10) {
                        element.yvel += 10;
                    }
                    element.yvel *= -1;
                }else {
                    element.y = y + data.tilesize;
                    element.yvel *= -1;
                }
            }else {
                collide(is_x, x, y, data.tilesize, data.tilesize, element);
            }
        }else if (data.tilemap[i][j] == "yellow" && does_collide_block(x, y, data.tilesize, data.tilesize, element)) {
            
        }
    }
    }}
    if (is_x) {
        break;
    }else {
        is_x = true;
    }
    }}
}

function sprites() {
    data.sprites.findLast(element => {
        //draw sprite as rectangle
        c.fillStyle = element.color;
        let mult = Math.min(width/2000, height/1000);
        c.fillRect((element.x - data.cam.X) * mult * data.zoom +topx, (element.y - data.cam.Y) * mult * data.zoom +topy, element.width * mult * data.zoom, element.height * mult * data.zoom);

        //physics
        if (element.physics.has_physics){
            //collision
            collision(element);

            //is grounded?
            if (element.y + element.height >= data.floor) {
                element.physics.is_grounded = true;
                element.y = data.floor - element.height;
                if (element.yvel > 0) {element.yvel = 0;}
            }

            if (element.physics.is_grounded) {
                //friction
                element.xvel *= element.physics.friction;
            }else {
                //gravity
                element.yvel += element.physics.gravity;
            }
        }else {
            element.x += element.xvel;
            element.y += element.yvel;
        }
        //player movement
        if (element.name == "player") {
            let movex = 0;
            let movey = 0;
            let shift = false;
            if (element.index == 0){
                movex = data.keyboard.move1x;
                movey = data.keyboard.move1y;
                shift = data.keyboard.shift1;
            }else if (element.index == 1) {
                movex = data.keyboard.move2x;
                movey = data.keyboard.move2y;
                shift = data.keyboard.shift2;
            }
            //X axis
            if (element.physics.is_grounded) {
                if (!shift) {
                    //speed 9 - 11 units
                    element.xvel += movex * (9 + Math.floor((Math.random() * 3)));
                }else {
                    //speed 1 unit
                    element.xvel += movex;
                }
            }else if (Math.abs(element.xvel) < 15 || element.xvel * movex < 0) {
                //speeds up 1 unit, 15 max
                element.xvel += movex;
            }
            //Y axis
            if (element.physics.is_grounded) {
                if (movey == -1) {
                    // jump speed 20
                    element.yvel = -25;
                }
            }
        }
    });
}

function border() {
    c.fillStyle = "black";
    if (aspect_ratio < 1) {
        c.fillRect(0, 0, width, (height - width) / 2);
        c.fillRect(0,(height + width) / 2, width, (height - width) / 2);
    }else if (aspect_ratio > 3) {
        c.fillRect(0, 0, (width - 3*height) / 2, height);
        c.fillRect((width + 3*height) / 2, 0, (width - 3*height) / 2, height);
    }
}

window.addEventListener('load', start);
window.addEventListener('keydown', onKeyDown);
window.addEventListener('keyup', onKeyUp);

function start() {
    let rem = document.getElementById("remove");
    rem.remove();
    level_gen(100);

    window.requestAnimationFrame(loop);
}

function loop() {
    camera();
    background();
    sprites();
    border();

    window.requestAnimationFrame(loop);
}

function onKeyDown(event) {
    switch (event.keyCode) {
        default: console.log(event.keyCode); break;

        case 87:
        if (data.keyboard.W == false) {data.keyboard.move1y += -1;}
        data.keyboard.W = true; 
        break;

        case 65: 
        if (data.keyboard.A == false) {data.keyboard.move1x += -1;}
        data.keyboard.A = true; 
        break;

        case 83: 
        if (data.keyboard.S == false) {data.keyboard.move1y += 1;}
        data.keyboard.S = true; 
        break;

        case 68: 
        if (data.keyboard.D == false) {data.keyboard.move1x += 1;}
        data.keyboard.D = true; 
        break;
        
        case 38:
        if (data.keyboard.up == false) {data.keyboard.move2y += -1;}
        data.keyboard.up = true; 
        break;

        case 37: 
        if (data.keyboard.left == false) {data.keyboard.move2x += -1;}
        data.keyboard.left = true; 
        break;

        case 40: 
        if (data.keyboard.down == false) {data.keyboard.move2y += 1;}
        data.keyboard.down = true; 
        break;

        case 39: 
        if (data.keyboard.right == false) {data.keyboard.move2x += 1;}
        data.keyboard.right = true; 
        break;
        
        case 16: data.keyboard.shift1 = true; break;
        case 190: data.keyboard.shift2 = true; break;
        case 85:
            if (!data.keyboard.U) {
                data.sprites[0].physics.has_collision = !(data.sprites[0].physics.has_collision);
                data.sprites[1].physics.has_collision = !(data.sprites[1].physics.has_collision);
            }
        data.keyboard.U = true; break;
    }
}
function onKeyUp(event) {
    switch (event.keyCode) {
        case 87:
        if (data.keyboard.W == true) {data.keyboard.move1y += 1;}
        data.keyboard.W = false; 
        break;

        case 65: 
        if (data.keyboard.A == true) {data.keyboard.move1x += 1;}
        data.keyboard.A = false; 
        break;

        case 83: 
        if (data.keyboard.S == true) {data.keyboard.move1y += -1;}
        data.keyboard.S = false; 
        break;

        case 68: 
        if (data.keyboard.D == true) {data.keyboard.move1x += -1;}
        data.keyboard.D = false; 
        break;

        case 38:
        if (data.keyboard.up == true) {data.keyboard.move2y += 1;}
        data.keyboard.up = false; 
        break;

        case 37: 
        if (data.keyboard.left == true) {data.keyboard.move2x += 1;}
        data.keyboard.left = false; 
        break;

        case 40: 
        if (data.keyboard.down == true) {data.keyboard.move2y += -1;}
        data.keyboard.down = false; 
        break;

        case 39: 
        if (data.keyboard.right == true) {data.keyboard.move2x += -1;}
        data.keyboard.right = false; 
        break;

        case 16: data.keyboard.shift1 = false; break;
        case 190: data.keyboard.shift2 = false; break;
        case 85: data.keyboard.U = false; break;
    }
}