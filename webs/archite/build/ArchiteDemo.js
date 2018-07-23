/**
 * Created by Administrator on 2017/2/6.
 */
/**
 * libs
 */
///<reference path="../@types/d3/index.d.ts" />
///<reference path="../@types/jquery/index.d.ts" />
///<reference path="../@types/three/index.d.ts" />
///<reference path="../@types/three/detector.d.ts" />
///<reference path="../@types/underscore/index.d.ts" />
///<reference path="../@types/tweenjs/index.d.ts" />
/**
 * coms
 */
///<reference path="../src/ArchiteTools.ts" />
///<reference path="../src/ArchiteBase.ts" />
///<reference path="../src/ArchiteUI.ts" />
///<reference path="../src/ArchiteData.ts" />
function init() {
    /**     * 建筑渲染     */
    var architeMain_ = new ArchiteMain(document.getElementById("lhf_archite_wengl_container"), document.getElementById("lhf_archite_wengl_control"));
    //摄像头配置参数  x  y z
    architeMain_.architewebgl.setDefaultCameraPosition([1800, 0, -800], //摄像机焦点  聚焦点 视点
    [1815, 631, 670], // 电脑上默认摄像机位置
    [1815, 1231, 800] // 手机上摄像机位置
    );
    //图标校正
    architeMain_.setIconCheck([
        { name: "ATM", type: "31003", ico: "ATM.png", en: "", searchShow: true },
        { name: "残障洗手间", type: "11005", ico: "crippled.png", en: "", searchShow: true },
        { name: "出入口", type: "31004", ico: "entry.png", en: "", searchShow: true },
        { name: "扶梯", type: "21002", ico: "escalator.png", en: "", searchShow: true },
        { name: "女洗手间", type: "11003", ico: "Female.png", en: "", searchShow: true },
        { name: "问讯处", type: "31001", ico: "inquiry.png", en: "", searchShow: true },
        { name: "直梯", type: "21003", ico: "lift.png", en: "", searchShow: true },
        { name: "补妆间", type: "31002", ico: "Makeup.png", en: "", searchShow: true },
        { name: "男洗手间", type: "11002", ico: "Male.png", en: "", searchShow: true },
        { name: "母婴室", type: "11004", ico: "MomBaby.png", en: "", searchShow: true },
        { name: "楼梯", type: "21001", ico: "stair.png", en: "", searchShow: true },
        { name: "洗手间", type: "11001", ico: "toilet.png", en: "", searchShow: true }
    ], "asset/PublicPointIco/");
    //默认3D or 2D   是否记录当前摄像头坐标
    architeMain_.architewebgl.enabled3D(true, false);
    /**     * ui     */
    var uimana_ = new ArchiteUI(document.getElementById("lhf_archite_ui_container"), architeMain_.architewebgl);
    uimana_.createFloorNameLabel(); //创建楼层名称显示
    uimana_.openScale(); //开启缩放
    uimana_.openSearch(); //开启搜索
    uimana_.search.searchNullPrompt = "本馆未找到，请尝试全馆搜索！"; //未搜索提示框
    uimana_.viewPatternSwitch(true); //3D模式选择  true默认选中 false未选中
    uimana_.floorsBtn(true, true); //楼层按钮   1是否显示楼层按钮  2是否显示 全部楼层按钮   1优先级最高
    //uimana_.showFuncSelectSwitch();
    //uimana_.showFuncAreaNameSwitch();
    //uimana_.showPubPointSwitch();
    uimana_.showMoveMapSwitch(); //是否可以移动地图
    //uimana_.createBackgroundSet();
    //uimana_.showXAxisRotateSwitch();
    //uimana_.showYAxisRotateSwitch();
    /**     * data mana     */
    var architeDataMana_ = new ArchiteData(uimana_, architeMain_.architewebgl, architeMain_.architeResources);
    //architeDataMana_.getMapsbyAjax("ajaxData/aiqing.json",{});
    //architeDataMana_.getMapsbyAjax("ajaxData/fangcaodi.json",{});
    //architeDataMana_.getMapsbyAjax("ajaxData/wbh1.json",{});
    //architeDataMana_.getMapsbyAjax("ajaxData/Hall5-2-1.json",{});
    //architeDataMana_.getMapsbyAjax("ajaxData/Hall6.json",{});
    //architeDataMana_.getMapsbyAjax("ajaxData/Hall-all.json",{});
    architeDataMana_.getMapsbyAjax("ajaxData/Hall-m123456789.json", {});
    function render() {
        requestAnimationFrame(render);
        architeMain_.render();
    }
    render();
    /**     * 自适应     */
    window.addEventListener('resize', onWindowResize, false);
    function onWindowResize() {
        var curWidth_ = window.innerWidth;
        var curHeight_ = window.innerHeight;
        architeMain_.windowResize(curWidth_, curHeight_);
    }
    onWindowResize();
}
window.onload = function () {
    init();
};
