class Player{
    constructor(){
        this.distance=0;
        this.name=null;
        this.index=null;
        this.rank=null;
    }
    getCount(){
        var countref=database.ref("playerCount");
        countref.on("value",function(data){
            playerCount=data.val();
        })
    }

    updateCount(count){
        database.ref("/").update({
            playerCount:count
        })
    }
    update(){
        var playerindex="players/player"+this.index;
        database.ref(playerindex).set({
            name:this.name,
            distance:this.distance
        })
    }
    static getPlayerInfo(){
        var playerref=database.ref("players");
        playerref.on("value",(data)=>{
            allPlayers=data.val()
        })
    }
    getCarsAtEnd(){
        var carRef=database.ref("carsAtEnd");
        carRef.on("value",(data)=>{
            this.rank=data.val();
        })
    }
    static updateCarsAtEnd(rank){
        database.ref("/").update({
            carsAtEnd:rank
        })
    }
}