import React, { useState, useEffect } from "react";
import axios from "axios";
import type { Post } from "../../types/types";

const PostManager: React.FC = () => {
  const [postTitle, setPostTitle] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:5656/api/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Create new post
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5656/api/posts/create", { PostTitle: postTitle });
      setPostTitle("");
      fetchPosts();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  // Delete post
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5656/api/posts/delete/${id}`);
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // Update post
  const handleUpdate = async (id: number) => {
    try {
      await axios.put(`http://localhost:5656/api/posts/update/${id}`, { PostTitle: editingTitle });
      setEditingId(null);
      setEditingTitle("");
      fetchPosts();
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 space-y-6">
      <h2 className="text-2xl font-bold">Manage Posts</h2>

      {/* Create Form */}
      <form onSubmit={handleCreate} className="flex gap-2">
        <input
          type="text"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
          placeholder="New Post Title"
          className="flex-1 border p-2"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add
        </button>
      </form>

      {/* List Posts */}
      <ul className="space-y-2">
        {posts.map((post) => (
          <li key={post.PostID} className="border p-3 flex justify-between items-center">
            {editingId === post.PostID ? (
              <div className="flex gap-2 w-full">
                <input
                  type="text"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  className="flex-1 border p-1"
                />
                <button
                  onClick={() => handleUpdate(post.PostID)}
                  className="bg-green-600 text-white px-2 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="bg-gray-500 text-white px-2 rounded"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <span>{post.PostTitle}</span>
                <div className="space-x-2">
                  <button
                    onClick={() => {
                      setEditingId(post.PostID);
                      setEditingTitle(post.PostTitle);
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post.PostID)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostManager;
