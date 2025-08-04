import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type Note = {
  id: string;
  title: string;
  content: string;
};

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [notes, setNotes] = useState<Note[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [viewModalVisible, setViewModalVisible] = useState(false);

  const handleDeleteNote = (id: string) => {
  setNotes((prev) => prev.filter((note) => note.id !== id));
  setViewModalVisible(false);
  setSelectedNote(null);
  };

  const handleAddNote = () => {
    setModalVisible(true);
  };

  const handleSaveNote = () => {
    if (!newTitle.trim() || !newContent.trim()) {
      Alert.alert('Missing Fields', 'Please enter both title and content.');
      return;
    }

    const newNote: Note = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      content: newContent.trim(),
    };

    setNotes((prev) => [newNote, ...prev]);
    setNewTitle('');
    setNewContent('');
    setModalVisible(false);
  };

  const renderNote = ({ item }: { item: Note }) => (
  <TouchableOpacity
    style={styles.noteCard}
    onPress={() => {
      setSelectedNote(item);
      setViewModalVisible(true);
    }}
  >
    <Text style={styles.noteTitle}>{item.title}</Text>
    <Text style={styles.noteContent}>{item.content}</Text>
  </TouchableOpacity>
    );

    const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            Welcome! <Text style={styles.highlight}>User</Text>
          </Text>
          <Text style={styles.subtitle}>Notes Page</Text>
        </View>

        <View style={styles.searchRow}>
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search notes..."
            placeholderTextColor="#6b7280"
            style={styles.searchInput}
          />
          <TouchableOpacity onPress={handleAddNote} style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <FlatList
        data={filteredNotes}
        keyExtractor={(item) => item.id}
        renderItem={renderNote}
        contentContainerStyle={styles.noteList}
        />

        {filteredNotes.length === 0 && (
        <Text style={{ textAlign: 'center', marginTop: 20, color: '#888' }}>
            No notes yet.
        </Text>
        )}

      </View>

      {/* Add Note Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>New Note</Text>
            <TextInput
              placeholder="Title"
              value={newTitle}
              onChangeText={setNewTitle}
              style={styles.input}
              placeholderTextColor="#999"
            />
            <TextInput
              placeholder="Content"
              value={newContent}
              onChangeText={setNewContent}
              style={[styles.input, { height: 100 }]}
              multiline
              placeholderTextColor="#999"
            />
            <View style={styles.modalActions}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.cancelBtn}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSaveNote} style={styles.saveBtn}>
                <Text style={styles.saveText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* view Note Modal */}
    <Modal visible={viewModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>{selectedNote?.title}</Text>
                <Text style={styles.noteContent}>{selectedNote?.content}</Text>

         <View style={styles.modalActions}>
            <TouchableOpacity
                onPress={() => handleDeleteNote(selectedNote?.id || '')}
                style={[styles.saveBtn, { backgroundColor: '#e63946' }]}
                >
                <Text style={styles.saveText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                setViewModalVisible(false);
                setSelectedNote(null);
                }}
                style={styles.cancelBtn}
                >
                <Text style={styles.cancelText}>Close</Text>
            </TouchableOpacity>
                </View>
            </View>
        </View>
    </Modal>     
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // ... previous styles
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, padding: 24 },
  header: { alignItems: 'center', marginTop: 50, marginBottom: 20 },
  title: { fontSize: 20, fontWeight: '700', color: '#1D2A32' },
  highlight: { color: '#cf6b31ff' },
  subtitle: { fontSize: 15, fontWeight: '500', color: '#929292', marginTop: 4 },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 16,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderRadius: 12,
    fontSize: 13,
    fontWeight: '500',
    color: '#222',
    borderWidth: 1,
    borderColor: '#C9D3DB',
  },
  addButton: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: '#d37f00ff',
    borderColor: '#b48c63ff',
    borderWidth: 1,
  },
  addButtonText: {
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
  },
  noteList: {
    paddingTop: 10,
  },
  noteCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
  },
  noteContent: {
    fontSize: 14,
    color: '#444',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000055',
    justifyContent: 'center',
    padding: 24,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#222',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    fontSize: 14,
    color: '#000',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  cancelBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  cancelText: {
    color: '#666',
    fontWeight: '500',
  },
  saveBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#cf6b31ff',
    borderRadius: 8,
  },
  saveText: {
    color: '#fff',
    fontWeight: '600',
  },
});
