<?php
// 本类由系统自动生成，仅供测试用途
class IndexAction extends Action {
    public function index()
    {
      // echo "这里是Index控制器里的删除方法";
      // dump($_GET);
      // dump(M('job'));
    // echo "Hello";   
    // $db = M('job');
    // $result = $db->select();
    // dump($result);
    // p($result);
      // U('delete',array('uid' => 1),'',1);die; 
      $this->display('index');
    }

    public function handle()
    {
      if (!IS_POST)
        _404('页面不存在');
      $data = array(
          'code_address' => I('addr','','htmlspecialchars'),
          'item' => I('addr','','htmlspecialchars'),
          'items' => I('item','','htmlspecialchars'),
          'start_time'=>date('Y-m-d H:i:s'),
          'is_start' => 0,
          'operate_status'=>0,
        );
      // echo date('Y-m-d H:i:s');
      if (M('job')->data($data)->add())
      {
        dump($data);
        $this->success('提交成功','index');
      }
      else
      {
        $this->error('');
      }

      //删除数据
      // $result = M('job')->where('id > 0')->delete();


      // dump($data);

// );
      // echo "这里是Index控制器里的删除方法";
      // dump(I('post.'));
    }

   public function add()
   {
    echo "这里是Index控制器里的添加方法";
   }
}