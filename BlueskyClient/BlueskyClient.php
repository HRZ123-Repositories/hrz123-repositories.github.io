function fetch_link_card($connection, $url) {
 
    // The required fields for every embed card
    $card = [
        "uri" => $url,
        "title" => "",
        "description" => "",
    ];
 
    // Create a new DOMDocument
    $doc = new DOMDocument();
 
    // Suppress errors for invalid HTML, if needed
    libxml_use_internal_errors(true);
 
    // Load the HTML from the URL
    $doc->loadHTMLFile($url);
 
    // Restore error handling
    libxml_use_internal_errors(false);
 
    // Create a new DOMXPath object for querying the document
    $xpath = new DOMXPath($doc);
 
    // Query for "og:title" and "og:description" meta tags
    $title_tag = $xpath->query('//meta[@property="og:title"]/@content');
    if ($title_tag->length > 0) {
        $card["title"] = $title_tag[0]->nodeValue;
    }
 
    $description_tag = $xpath->query('//meta[@property="og:description"]/@content');
    if ($description_tag->length > 0) {
        $card["description"] = $description_tag[0]->nodeValue;
    }
 
    // If there is an "og:image" meta tag, fetch and upload that image
    $image_tag = $xpath->query('//meta[@property="og:image"]/@content');
    if ($image_tag->length > 0) {
        $img_url = $image_tag[0]->nodeValue;
        // Naively turn a "relative" URL (just a path) into a full URL, if needed
        if (!parse_url($img_url, PHP_URL_SCHEME)) {
            $img_url = $url . $img_url;
        }
         
        $image = $this->upload_media_to_bluesky($connection, $img_url);
    }
 
    $embed = '';
    $embed = [
      'embed' => [
        '$type' => 'app.bsky.embed.external',
        'external' => [
            'uri' => $card['uri'],
            'title' => $card['title'],
            'description' => $card['description'],
            'thumb' => $image,
        ],
      ],
    ];
 
    return $embed;
     
  }
