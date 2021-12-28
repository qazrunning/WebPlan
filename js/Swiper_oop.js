/**
 * data
 *      autoplay[number]:1000 (ms)
 *      changeTime[number]:1000 (ms)
 */

;
(function () {
    function Swiper(data) {
        this.autoplay = data && data.autoplay || 2000
        this.changeTime = data && data.changeTime || 500
    }
    // 初始化
    Swiper.prototype.init = function () {
        // dom
        this.oWrap = document.getElementById("swiper");
        this.prev_btn = document.querySelector('.prev_btn')
        this.next_btn = document.querySelector('.next_btn')
        this.list = document.querySelector('.swiper_img_list')
        this.circles = null;
        // 初始位
        this._index = 0
        this._len = this.list.children.length
        this.lock = true
        this.sw = -(document.querySelector('#swiper').offsetWidth)
        // 执行
        this.cloneFristImg()
        this.creatDot()
        // 自动播放
        this.autoPlay()
        // 给按钮添加事件
        this.next_btn.addEventListener('click', this.leftToRight.bind(this))
        this.prev_btn.addEventListener('click', this.rightToLeft.bind(this))
    }
    // 克隆
    Swiper.prototype.cloneFristImg = function () {
        let cloneImg = this.list.firstElementChild.cloneNode();
        this.list.appendChild(cloneImg)
    }
    Swiper.prototype.closeLock = function () {
        // 关锁
        this.lock = true
        let lockTime = setTimeout(() => {
            this.lock = true
            clearTimeout(lockTime)
        }, this.changeTime)
    }
    // 创建dot
    Swiper.prototype.creatDot = function () {
        let _html = ''
        for (let i = 0; i < this._len; i++) {

            _html += i == 0 ? `<li class="dot_item active" data-n="${i}"></li>` : `<li class="dot_item" data-n="${i}"></li>`
        }
        _html = `<ul class="dot_list">${_html}</ul>`
        document.querySelector('.swiper_main').insertAdjacentHTML('beforeend', _html)
        this.circles = document.querySelectorAll(".dot_item");
    }
    // t同步点点
    Swiper.prototype.setDot = function () {
        for (let i = 0; i < this.circles.length; i++) {
            if (i === this._index) {
                this.circles[i].classList.add("active");
            } else {
                this.circles[i].classList.remove("active");
            }
        }
    }
    // 移动
    Swiper.prototype.swiperMove = function () {
        this.list.style.left = this._index * this.sw + 'px'
        this.list.style.transition = `all ${this.changeTime / 1000}s ease`;
    }
    // 还原至第一张
    Swiper.prototype.swiperReduction = function () {
        this.list.style.left = 0;
        this.list.style.transition = "none";
    }
    // 还原至最后一张
    Swiper.prototype.swiperReductionLast = function () {
        this.list.style.left = this._len * this.sw + 'px'
        this.list.style.transition = "none";
    }
    // 从左往右移动
    Swiper.prototype.leftToRight = function () {
        if (!this.lock) return
        this._index = Number(this._index) + 1
        this.swiperMove()
        if (this._index === this._len) {
            this._index = 0
            setTimeout(() => {
                this.swiperReduction()
            }, this.changeTime)
        }
        this.setDot()
        this.closeLock()
    }
    Swiper.prototype.rightToLeft = function () {
        if (!this.lock) return
        this._index = Number(this._index) - 1
        if (this._index === -1) {
            // 要移动多少？
            this.swiperReductionLast()
            this._index = this._len - 1
            setTimeout(() => {
                // 后退的动画不友好，补充一下
                this.swiperMove()
            }, 0)
        } else {
            this.swiperMove()
        }
        this.setDot()
        this.closeLock()
    }
    Swiper.prototype.autoPlay = function () {
        let autoplay = setInterval(this.leftToRight.bind(this), this.autoplay);
        this.oWrap.addEventListener("mouseenter", () => {
            clearInterval(autoplay);
        });
        // 移出继续轮播
        this.oWrap.addEventListener("mouseleave", () => {
            // 设表先关
            clearInterval(autoplay);
            autoplay = setInterval(this.leftToRight.bind(this), this.autoplay);
        });
    }

    window.Swiper = Swiper
})()