<section id="home" class="home">
	<ul class="type-btns clearfix">
		<li v-for="item in types">
			<a v-bind:href="'#/list/type/' + item.id">
				<img v-bind:src="'img/icon/' + item.url" alt="">
				<p>{{item.title}}</p>
			</a>
		</li>
	</ul>
	<!-- 定义广告部分 -->
	<ul class="ad clearfix">
		<li v-for="item in ad">
			<a v-bind:href="'#/detail/' + item.id">
				<h3>{{item.title}}</h3>
				<p>{{item.description}}</p>
				<img v-bind:src="'img/ad/' + item.url" alt="">
			</a>
		</li>
	</ul>
	<!-- 定义商品列表 -->
	<ul class="list-part">
		<li class="clearfix" v-for="item in list">
			<a v-bind:href="'#/detail/' + item.id">
				<img v-bind:src="'img/list/' + item.img" alt="">
				<div class="text-content">
					<h3>{{item.title}}</h3>
					<p>
						<span class="price">{{item.price | itemPrice}}</span>
						<span class="origin">{{item.orignPrice | itemOrigin}}</span>
						<span class="sale">{{item.sales | itemSale}}</span>
					</p>
				</div>
			</a>
		</li>
	</ul>
</section>