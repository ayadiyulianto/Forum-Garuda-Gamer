const CommentRepository = require("../../../../Domains/comments/CommentRepository");
const ThreadRepository = require("../../../../Domains/threads/ThreadRepository");
const ListComment = require("../../../../Domains/comments/entities/ListComment");
const ThreadDetail = require("../../../../Domains/threads/entities/ThreadDetail");
const ThreadDetailUseCase = require("../ThreadDetailUseCase");

describe("ThreadDetailUseCase", () => {
  it("it should orchecstrating the get detail action correctly", async () => {
    // Arrange
    const threadId = "thread-123";
    const mockListComment = [
      new ListComment({
        id: "comment-123",
        content: "A comment",
        username: "dicoding",
        created_at: "2023-06-18T10:39:09.123Z",
        is_delete: true,
      }),
    ];
    const mockThreadDetail = new ThreadDetail({
      id: "thread-123",
      title: "A thread",
      body: "A thread body",
      created_at: "2023-06-18T10:39:09.123Z",
      username: "dicoding",
      comments: mockListComment,
    });

    /** creating dependency of use case */
    const mockCommentRepository = new CommentRepository();
    const mockThreadRepository = new ThreadRepository();

    /** mocking needed function */
    mockThreadRepository.verifyAvailableIdThread = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockCommentRepository.getCommentsByThreadId = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockListComment));
    mockThreadRepository.getThreadDetail = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockThreadDetail));

    /** creating use case instance */
    const threadDetailUseCase = new ThreadDetailUseCase({
      commentRepository: mockCommentRepository,
      threadRepository: mockThreadRepository,
    });
    const threadDetail = await threadDetailUseCase.execute(threadId);
``
    // Assert
    expect(threadDetail).toStrictEqual(mockThreadDetail);
    expect(mockCommentRepository.getCommentsByThreadId).toBeCalledWith(
      threadId
    );
  });
});
