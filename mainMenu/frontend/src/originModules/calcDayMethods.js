
function getMonthDays(y, m){
    switch(m){
        case 1:
            return 31;
        case 2:
            //うるー年かどうか
            if(y % 4 == 0){
                return 29;
            }
            else{
                return 28;
            }
        case 3:
            return 31;
        case 4:
            return 30;
        case 5:
            return 31;
        case 6:
            return 30;
        case 7:
            return 31;
        case 8:
            return 31;
        case 9:
            return 30;
        case 10:
            return 31;
        case 11:
            return 30;
        case 12:
            return 31;
        default:
            return -1;
    }
}
function getYearDays(y){
    if(y % 4 == 0){
        return 366;
    }
    else{
        return 365;
    }
}

//1は開始日時、２は終了日時を想定。開始から終了までの日数を求める。
exports.getDays = (y1, m1, d1, y2, m2, d2)=>{
    var y = y2 - y1;  //何年あるか計算

    //2022年1月1日～2023年9月6日までとすると
    /*
    2022年の1月から計算スタート2, 3, 4, ...
    */
    //y = 1, m = 5
    var d = 0;

    //年をまたぐ場合
    if(y > 0){
        //y - 1
        //2022-03-15～2023-0206(残りの月＋０年＋終わりの年の日数)
        //2022-03-15～2024-0206(残りの月＋１年＋終わりの年の日数)
        //2022-03-15～2025-0206(残りの月＋２年＋終わりの年の日数)
        //2022-03-15～2025-0206(残りの月＋(y - 1)年＋終わりの年の日数)
        //残りの月の日数を求める
        for(var i = m1; i <= 12; i++){
            d += getMonthDays(y1, i);
        }
        //開始日の日数を引く。月の途中からスタートのため
        d -= d1; 

        //開始年の次の年～終了年の前の年の日数を計算（うるー年含む）
        for(i = y1 + 1; i < y2 - 1; i++){
            d += getYearDays(i);
        }

        //終了月を除いて計算
        for(i = 1; i < m2; i++){
            d += getMonthDays(y2, i);
        }
        //終了月の日数を足す
        d += d2;
    }
    else{
        //2022-01-01～2022-09-06までなどの場合は以下でＯＫ
        for(var j = m1; j < m2; j++){
            //〇〇年〇〇月の日数を求める
            d += getMonthDays(y1, j);
        }
        //開始日の日数を引き、終了日を足す。
        d = d - d1 + d2;
    }
    return d;
}
