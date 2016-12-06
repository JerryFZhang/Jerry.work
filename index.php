<?php
    // Initialize the language code variable
$lc = "";
    // Check to see that the global language server variable isset()
    // If it is set, we cut the first two characters from that string
if(isset($_SERVER['HTTP_ACCEPT_LANGUAGE']))
    $lc = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);

    // Now we simply evaluate that variable to detect specific languages
if($lc == "zh"){
    include_once("home-zh.html");
    exit();
} else if($lc == "fr"){
    include_once("home-en.html");
    //will do later
    exit();
}
else{ // don't forget the default case if $lc is empty
    include_once("home-en.html");
    exit();
}
?>

<?php
$file = 'FengweiZhang.pdf';
$filename = 'FengweiZhang.pdf';
header('Content-type: application/pdf');
header('Content-Disposition: inline; filename="' . $filename . '"');
header('Content-Transfer-Encoding: binary');
header('Content-Length: ' . filesize($file));
header('Accept-Ranges: bytes');

@readfile($file);
?>


<?php
$track = "fls.mp3";

if (file_exists($track)) {
    header("Content-Type: audio/mpeg");
    header('Content-Length: ' . filesize($track));
    header('Content-Disposition: inline; filename="lilly.mp3"');
    header('X-Pad: avoid browser bug');
    header('Cache-Control: no-cache');
    readfile($track);
    exit;
} else {
    header($_SERVER['SERVER_PROTOCOL'].' 404 Not Found', true, 404);
    echo "no file";
}
?>
