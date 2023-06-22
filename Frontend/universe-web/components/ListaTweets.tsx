class ListaTweets extends React.Component {
    constructor(parameters) {
        super(parameters);
        this.state = {
            tweets: [
                {
                    'id': 1,
                    'userId': 10,
                    'releaseDate': 15,
                    'mensagem': "Ola mundao mundano",
                    'imagens': []
                }, {
                    'id': 2,
                    'userId': 10,
                    'releaseDate': 15,
                    'mensagem': "Ola mundao mundano 2",
                    'imagens': []
                }, {
                    'id': 3,
                    'userId': 10,
                    'releaseDate': 15,
                    'mensagem': "Ola mundao mundano 3",
                    'imagens': []
                }
            ]
        }
    }
}