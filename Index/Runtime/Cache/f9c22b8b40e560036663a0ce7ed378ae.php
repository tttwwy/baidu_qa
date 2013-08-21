<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html>
  <head>
    <title>在线评测系统</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Bootstrap -->
    <link href="__PUBLIC__/bootstrap/css/bootstrap.min.css" rel="stylesheet" media="screen">
  </head>
  <body>
    <h1>评测系统</h1>
    <script src="__PUBLIC__/js/jquery.js"></script>
    <script src="__PUBLIC__/bootstrap/js/bootstrap.min.js"></script>


   <form action="<?php echo U('handle');?>" method="post">

  
  <fieldset>
    <!-- <legend>Legend</legend> -->
    <!-- <label>不告诉你</label> -->
    <p><input type="text" name = "addr" placeholder="请输入地址…"></p>
    
      <!-- <input type="text" name="fname" /> -->
    <select name="item">
<option value ="自动化">自动化</option>
<option value ="手工">手工</option>
<option value ="其他">其他</option>

  
</select>
    <!-- <span class="help-block">请提交</span> -->

    <br>

    <button type="submit" class="btn">提交</button>
    <!-- <input type="submit" value="Submit" /> -->
  </fieldset>

</form>

  </body>
</html>