const { nanoid } = require('nanoid');
const faker = require('faker');

class PostsGenerator {
	constructor() {
		this.posts = [];
		this.comments = new Map();
	}

	generate() {
		// Очищаем от предыдущих данных.
		this.posts = [];
		this.comments = new Map();

		// Генерируем данные для постов.
		const postsCount = Math.floor(Math.random() * 10) + 1;

		for (let i = 1; i <= postsCount; i += 1) {
			const post = {
				id: nanoid(),
				author_id: nanoid(),
				title: faker.lorem.words(),
				author: faker.name.findName(),
				avatar: PostsGenerator.generateAvatar(),
				image: PostsGenerator.generateImage(),
				created: Date.now(),
			};

			this.posts.push(post);
			this.generateComments(post.id);
		}
	}

	generateComments(postId) {
		const commentsCount = Math.floor(Math.random() * 3) + 1;
		const comments = [];

		for (let i = 1; i <= commentsCount; i += 1) {
			const comment = {
				id: nanoid(),
				post_id: postId,
				author_id: nanoid(),
				author: faker.name.findName(),
				avatar: PostsGenerator.generateAvatar(),
				content: faker.lorem.paragraph(),
				created: Date.now(),
			};

			comments.push(comment);
		}

		this.comments.set(postId, comments);
	}

	static generateAvatar() {
		const avatarSize = Math.floor(Math.random() * (55 - 50)) + 50; // 50 - 55
		const avatarType = Math.floor(Math.random() * 2) + 1; // 1 - 2
		const avatarFrom = {
			1: faker.image.avatar(),
			2: `https://placeimg.com/${avatarSize}/${avatarSize}/people`,
		};

		return avatarFrom[avatarType];
	}

	static generateImage() {
		const imageSizeX = Math.floor(Math.random() * (600 - 550)) + 550; // 550 - 600
		const imageSizeY = Math.floor(Math.random() * (350 - 300)) + 300; // 300 - 350
		const imageType = Math.floor(Math.random() * 2) + 1; // 1 - 2
		const imageFrom = {
			1: 'nature',
			2: 'arch',
		};

		return `https://placeimg.com/${imageSizeX}/${imageSizeY}/${imageFrom[imageType]}`;
	}
}

module.exports = PostsGenerator;
