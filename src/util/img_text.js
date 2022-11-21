import batteryImg from './info_img/건전지.png';
import vinylsImg from './info_img/비닐.png';
import polystyreneImg from './info_img/스티로폼.png';
import clothesImg from './info_img/옷.png';
import glassImg from './info_img/유리병.png';
import trashImg from './info_img/일반쓰레기.png';
import electronicImg from './info_img/전자제품.png';
import lightImg from './info_img/조명.png';
import paperImg from './info_img/종이.png';
import canImg from './info_img/캔.png';
import plasticImg from './info_img/플라스틱.png';


import vinylsLogo from './info_logo/비닐류.png';
import glassLogo from './info_logo/유리.png';
import paperLogo from './info_logo/종이.png';
import canLogo from './info_logo/캔.png';
import plasticLogo from './info_logo/플라스틱.png';


export const infoTag =
{
    "battery": [0, "건전지", "#663300", batteryImg],
    "vinyls": [1, "비닐", "#663399", vinylsImg, vinylsLogo],
    "polystyrene": [2, "스티로폼", "#66CCFF", polystyreneImg],
    "clothes": [3, "의류", "#FF66CC", clothesImg],
    "glass": [4, "유리병", "#FF6600", glassImg, glassLogo],
    "trash": [5, "일반쓰레기", "#000000", trashImg],
    "electronics": [6, "전자제품", "#00FFCC", electronicImg],
    "light": [7, "조명", "#FFFF66", lightImg],
    "paper": [8, "종이류", "#339933", paperImg, paperLogo],
    "can": [9, "금속캔", "#CCCCCC", canImg, canLogo],
    "plastic": [10, "플라스틱", "#0033FF", plasticImg, plasticLogo],
}