## Usage

Embed this script (optinally jQuery if not already in use) and replace [api-key] and [idList] with your trello creds.

```
<script src="http://code.jquery.com/jquery-1.7.1.min.js"></script>
    <script src="https://api.trello.com/1/client.js?key=[api-key]"></script>
    <script src="http://cdn.rawgit.com/Marc3llo/reporter/master/min/reporter-min.js"></script>
    <script>
        $(document).ready(function(){
            reporter('[idList]');
    });
</script>
```