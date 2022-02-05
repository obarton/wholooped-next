function str_pad_left(string: any, pad: any, length: number) {
    return (new Array(length+1).join(pad)+string).slice(-length);
}

export function fancyTimeFormat(time: any)
{   
    // minutes and seconds
    var minutes = Math.floor(time / 60);
    var seconds = time - minutes * 60;

    return minutes+':'+str_pad_left(seconds,'0',2);
}