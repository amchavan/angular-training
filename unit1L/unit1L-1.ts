function typeMessage(message: string): void {
    console.log( message );
}

function typeMessageAfterDelay(message: string): void {
    setTimeout(() => typeMessage(message), 1000);
}

function example1(): void {
    typeMessage('First');
    typeMessageAfterDelay('Second');
    typeMessage('Third');
}

example1();
