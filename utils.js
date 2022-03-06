 export function drawStatusText(context, input, player){
    context.fillStyle = 'white';
    context.font = '18px Arial';
    context.fillText('Last Input: ' + input.lastkey, 30, 45);
    context.fillText('Active Status: ' + player.currentState.state, 30, 70);
}