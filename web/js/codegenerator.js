function constructFcb() {
    const noval = 60;	//hex
    getById("fcbs").value = "";
    getById("fcbdata").style.display = "block";
    let fcbval, charval;
    let fullASMCode = "        ORG $4E21\r\n" +
        "        PSHS X,Y,U,A,B\r\n" +
        "        \r\n" +
        "        LDX #$400\r\n" +
        "        LDY #TSB\r\n" +
        "        \r\n" +
        "DRAW    LDD ,Y++\r\n" +
        "        STD ,X++\r\n" +
        "        CMPX #$600\r\n" +
        "        BNE DRAW\r\n" +
        "        \r\n" +
        "EXIT    PULS X,Y,U,A,B\r\n" +
        "        RTS ; EXIT PROGRAM\r\n\r\n";
    let data = '';

    for (var j = 0; j < 16; j++) {
        var fcbline = String.fromCharCode(9) + "fcb" + String.fromCharCode(9);
        for (var i = j * 32; i < j * 32 + 32; i++) {
            var temp = getById("pixel_" + i).innerHTML;
            if (temp === "&nbsp;") {
                fcbval = noval
            }
            else {
                charval = temp.substr(temp.lastIndexOf(".jpg") - 2);
                charval = charval.replace("/", "0");
                fcbval = charval.substr(0, charval.lastIndexOf(".jpg"))
            }
            fcbline += "$" + fcbval + ","
        }
        fcbline = fcbline.substr(0, fcbline.length - 1) + String.fromCharCode(13);
        data += fcbline;
    }
    data = 'TSB    ' + data.substring(0);

    getById("fcbs").value = fullASMCode + data;
}