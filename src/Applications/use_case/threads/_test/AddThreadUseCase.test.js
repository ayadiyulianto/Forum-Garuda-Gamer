const AddThread = require("../../../../Domains/threads/entities/AddThread");
const AddedThread = require("../../../../Domains/threads/entities/AddedThread");
const ThreadRepository = require("../../../../Domains/threads/ThreadRepository");
const AddThreadUseCase = require("../AddThreadUseCase");

describe("AddThreadUseCase", () => {
  it("it should orchestrating the add thread action correctly", async () => {
    // Arrange
    const useCasePayload = {
      title: "A thread",
      body: "A thread body",
      owner: "user-123",
    };
    const expectAddedThread = new AddedThread({
      id: "thread-123",
      title: "A thread",
      owner: "user-123",
    });

    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();

    /** mocking needed function */
    mockThreadRepository.addThread = jest
      .fn()
      .mockImplementation(() => Promise.resolve(expectAddedThread));

    /** creating use case instance */
    const addThreadUseCase = new AddThreadUseCase({
      threadRepository: mockThreadRepository,
    });

    /** action */
    const addedThread = await addThreadUseCase.execute(useCasePayload);
    expect(addedThread).toStrictEqual(expectAddedThread);
    expect(mockThreadRepository.addThread).toBeCalledWith(
      new AddThread({
        title: "A thread",
        body: "A thread body",
        owner: "user-123",
      })
    );
  });
});
