function write_document_item(id, checked)
{
    document.write('<input type="checkbox" name="' + id + '" id="' + id + '" class="css-checkbox" onclick="something_checked()"')
    if(checked)
        document.write(' checked="checked"');
    document.write('/><label for="' + id + '" class="css-label"></label>');
}

function write_document_checkboxes()
{
    var i, j, k = 0;
    for(i=0;i<17;i++)
    {
        l = [4, 7, 10, 11, 12, 13, 14, 15, 14, 15, 14, 13, 12, 11, 10, 7, 4][i];
        for(j=0;j<l;j++)
        {
            write_document_item("cc_" + k);
            k++;
        }
        document.write('<br/>');
    }
}

function read_bits_from_base64(str)
{
    str = str.replace('#','');
    var bytes = window.atob(str);
    var i, bits = [];
    var buf, buf_pow = 1;
    for(i=0; i<bytes.length; i++)
    {
        buf = bytes[i].charCodeAt();
        for(buf_pow=1;buf_pow<256;buf_pow*=2)
            bits.push(buf&buf_pow?1:0);
    }
    return bits;
}

function write_bits_to_base64(bits)
{
    var i, bytes = '';
    var buf = 0, buf_pow = 1;
    for(i=0; i<bits.length; i++)
    {
        buf = buf + bits[i]*buf_pow;
        buf_pow *= 2;
        if((buf_pow==256)||(i==bits.length-1))
        {
            bytes += String.fromCharCode(buf);
            buf = 0;
            buf_pow = 1;
        }
    }
    return window.btoa(bytes);
}

function set_checked_bits(bits)
{
    var k=0;
    for(k=0;k<bits.length;k++)
    {
        if(document.getElementById("cc_" + k))
        {
            document.getElementById("cc_" + k).checked = bits[k];
        }
    }
}

function get_checked_bits()
{
    var k=0, bits = [];
    while(document.getElementById("cc_" + k))
    {
        bits.push(document.getElementById("cc_" + k).checked ? 1 : 0);
        k += 1;
    }
    return bits;
}

function something_checked()
{
    document.location.hash = write_bits_to_base64(get_checked_bits());
}

function clear_bits(bit)
{
    var k;
    for(k=0;document.getElementById("cc_" + k);k++)
        document.getElementById("cc_" + k).checked = bit;
    something_checked();
}