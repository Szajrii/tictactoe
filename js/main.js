Vue.component("box", {

		template: `
		<div class="box fa" :data-row="row" :data-column="column" player="player" index="index" game-progress="gameprogress"  @click="placeSign" v-html="activeIcon"></div>

		`,

		props:["row", "column", "player", "index", "gameprogress"],


		data:function(){
			return {
				isMarked: false,
				circle: "<i class='far fa-circle' ></i>",
				exMark: "<i class='fas fa-times'></i>",
				activeIcon: ""
			}
		},

		watch: {
			gameprogress: function(){
				if (this.gameprogress == "new game"){
					this.isMarked = false
					this.activeIcon = ""
				}
			}
		},
		
		methods:{
			placeSign: function(){

				if(this.gameprogress !== "ended"){
					if(!this.isMarked){
						if(this.player == 'one'){
							this.activeIcon = this.exMark;
						}else{
							this.activeIcon = this.circle;
						}

						this.isMarked = true;
						this.$emit( "place-sign", this.index );

					}else{
						console.log( "To pole jest już zajęte" )
					}
					
				}else{
					alert("Gra się już zakończyła. Skorzystaj z przycisku, aby rozpocząć nową grę")
				}
			}
		}
	})

	new Vue ({
		el: "#app",
		data:{
			playerTurn: "one",
			winningCombination: [
				[1,2,3],[4,5,6],[7,8,9],
				[1,4,7],[2,5,8],[3,6,9],
				[1,5,9],[3,5,7]
			],
			playerOneArr: [],
			playerTwoArr: [],
			playerWon: "",
			gameProgress: "beforestart",
			movesCounter: 0,
			circle: "<i class='far fa-circle player-sign'></i>",
			exMark: "<i class='fas fa-times player-sign'></i>",
			activePlayerIcon: "<i class='fas fa-times player-sign'></i>"

			
		},

		watch:{
			
			playerOneArr: function(){
				let counter = 0;
				let counter2 = 0;
				this.winningCombination.forEach(value => {
		
					value.forEach( ( value2, index ) => {
						console.log(value2)
						if( this.playerOneArr.includes(value2) ){
							
							counter ++;
							counter2 ++;
							console.log("Pokaz dupe : " + value2)
						}else{
							
							counter = 0;
							counter2 --;
							
						}
						
						
						if( index == 2 ){
							if( counter == 3 ){
								this.playerWon = "Pierwszy"
								this.gameProgress = "ended"

								return
							}else{
								counter = 0;
							}
						}

						
							
					})
				})
				
				
			},

			playerTwoArr: function(){
				let counter = 0;
				this.winningCombination.forEach(value => {

					value.forEach( ( value2, index ) => {
						
						if(this.playerTwoArr.includes(value2)){
							
							counter ++;
							
						}else{
							
							counter = 0;
							
						}
						
						if( index == 2){
							if(counter == 3){
								this.playerWon = "Drugi"
								this.gameProgress = "ended"

								return
							}else{
								counter = 0;
							}
						}
							
					})
				})
				
				
			},
			movesCounter: function(){
				if(this.playerWon == "" && this.movesCounter == 9 ){
					this.playerWon = "remis!"
					this.gameProgress = "ended"
				}
			},
		

		playerTurn: function(){
			if(this.playerTurn == "one"){
				this.activePlayerIcon = this.exMark;
			}else{
				this.activePlayerIcon = this.circle;
			}
		}

		},


		methods:{
			placeSign: function(id){

				if(this.playerTurn == "one"){
					this.playerOneArr.push(parseInt(id));

					

					this.playerTurn = "two";
					
				}else{
					this.playerTwoArr.push(parseInt(id));
					this.playerTurn = "one"
					
				}
				
					this.movesCounter ++					
						
			},
			
			clickThis: function(event){
				console.log(event);
			},

			player: function(){
				 return this.playerTurn == 'one' ? 'Pierwszy' : 'Drugi'
			},

			newgame: function(){
				this.gameProgress = "new game"	
				this.playerWon = ""
				this.playerOneArr = []
				this.playerTwoArr = []
				this.playerTurn = "one"
				this.movesCounter = 0;
			
		}
		},
		

	});

