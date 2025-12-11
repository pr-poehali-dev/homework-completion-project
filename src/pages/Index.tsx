import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface Review {
  id: number;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

interface Assignment {
  id: number;
  title: string;
  subject: string;
  grade: string;
  pages: number;
  format: string;
  isFavorite: boolean;
  rating: number;
  reviewCount: number;
  reviews: Review[];
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedGrades, setSelectedGrades] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  
  const [assignments, setAssignments] = useState<Assignment[]>([
    { id: 1, title: 'Решение квадратных уравнений', subject: 'Математика', grade: '8 класс', pages: 12, format: 'PDF', isFavorite: false, rating: 4.8, reviewCount: 24, reviews: [
      { id: 1, author: 'Анна М.', rating: 5, comment: 'Отличное объяснение! Все понятно и структурировано.', date: '2024-12-08' },
      { id: 2, author: 'Иван К.', rating: 5, comment: 'Помогло разобраться с темой. Рекомендую!', date: '2024-12-07' },
      { id: 3, author: 'Мария П.', rating: 4, comment: 'Хорошо, но хотелось бы больше примеров.', date: '2024-12-06' },
    ]},
    { id: 2, title: 'Анализ произведения "Евгений Онегин"', subject: 'Литература', grade: '9 класс', pages: 8, format: 'PDF', isFavorite: false, rating: 4.6, reviewCount: 18, reviews: [
      { id: 1, author: 'Ольга С.', rating: 5, comment: 'Глубокий анализ, все аспекты раскрыты.', date: '2024-12-09' },
    ]},
    { id: 3, title: 'Законы Ньютона - практические задачи', subject: 'Физика', grade: '10 класс', pages: 15, format: 'PDF', isFavorite: false, rating: 4.9, reviewCount: 31, reviews: [
      { id: 1, author: 'Дмитрий В.', rating: 5, comment: 'Лучший материал по теме!', date: '2024-12-10' },
      { id: 2, author: 'Елена Т.', rating: 5, comment: 'Подробные решения с пояснениями.', date: '2024-12-09' },
    ]},
    { id: 4, title: 'Органическая химия: углеводороды', subject: 'Химия', grade: '10 класс', pages: 10, format: 'PDF', isFavorite: false, rating: 4.5, reviewCount: 15, reviews: [] },
    { id: 5, title: 'История Древней Руси', subject: 'История', grade: '6 класс', pages: 18, format: 'PDF', isFavorite: false, rating: 4.7, reviewCount: 22, reviews: [] },
    { id: 6, title: 'Present Perfect: упражнения и правила', subject: 'Английский', grade: '7 класс', pages: 7, format: 'PDF', isFavorite: true, rating: 4.9, reviewCount: 35, reviews: [
      { id: 1, author: 'Александр Н.', rating: 5, comment: 'Наконец-то понял это время! Спасибо!', date: '2024-12-11' },
    ]},
    { id: 7, title: 'Тригонометрические уравнения', subject: 'Математика', grade: '10 класс', pages: 14, format: 'PDF', isFavorite: false, rating: 4.4, reviewCount: 12, reviews: [] },
    { id: 8, title: 'Электромагнитная индукция', subject: 'Физика', grade: '11 класс', pages: 11, format: 'PDF', isFavorite: false, rating: 4.8, reviewCount: 19, reviews: [] },
    { id: 9, title: 'Реакции окисления-восстановления', subject: 'Химия', grade: '9 класс', pages: 9, format: 'PDF', isFavorite: false, rating: 4.6, reviewCount: 14, reviews: [] },
  ]);

  const subjects = ['Математика', 'Физика', 'Химия', 'Литература', 'История', 'Английский'];
  const grades = ['6 класс', '7 класс', '8 класс', '9 класс', '10 класс', '11 класс'];

  const toggleFavorite = (id: number) => {
    setAssignments(prev =>
      prev.map(item =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
  };

  const toggleSubject = (subject: string) => {
    setSelectedSubjects(prev =>
      prev.includes(subject)
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
  };

  const toggleGrade = (grade: string) => {
    setSelectedGrades(prev =>
      prev.includes(grade)
        ? prev.filter(g => g !== grade)
        : [...prev, grade]
    );
  };

  const clearFilters = () => {
    setSelectedSubjects([]);
    setSelectedGrades([]);
  };

  const openReviewDialog = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setIsReviewDialogOpen(true);
  };

  const submitReview = () => {
    if (!selectedAssignment) return;
    
    const review: Review = {
      id: Date.now(),
      author: 'Вы',
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0],
    };

    setAssignments(prev =>
      prev.map(item =>
        item.id === selectedAssignment.id
          ? {
              ...item,
              reviews: [review, ...item.reviews],
              reviewCount: item.reviewCount + 1,
              rating: ((item.rating * item.reviewCount + newReview.rating) / (item.reviewCount + 1)),
            }
          : item
      )
    );

    setIsReviewDialogOpen(false);
    setNewReview({ rating: 5, comment: '' });
  };

  const renderStars = (rating: number, size: number = 16, interactive: boolean = false, onRate?: (rating: number) => void) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => interactive && onRate && onRate(star)}
            disabled={!interactive}
            className={interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}
          >
            <Icon
              name="Star"
              size={size}
              className={star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
            />
          </button>
        ))}
      </div>
    );
  };

  const filteredAssignments = assignments.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'favorites' && item.isFavorite);
    const matchesSubject = selectedSubjects.length === 0 || selectedSubjects.includes(item.subject);
    const matchesGrade = selectedGrades.length === 0 || selectedGrades.includes(item.grade);
    
    return matchesSearch && matchesTab && matchesSubject && matchesGrade;
  });

  const activeFiltersCount = selectedSubjects.length + selectedGrades.length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="GraduationCap" className="text-primary-foreground" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">ГДЗ Академия</h1>
                <p className="text-xs text-muted-foreground">Проверенные решения задач</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <button className="text-sm font-medium text-foreground hover:text-accent transition-colors">
                Главная
              </button>
              <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Поиск
              </button>
              <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Избранное
              </button>
              <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Аккаунт
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary to-background py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Надёжные решения домашних заданий
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Проверенные работы по всем школьным предметам с подробными объяснениями
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Icon name="Search" className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                type="text"
                placeholder="Поиск по предмету или теме задания..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-base bg-white border-2 focus:border-accent"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex gap-8 max-w-7xl mx-auto">
            {/* Sidebar Filters */}
            <aside className={`${isSidebarOpen ? 'block' : 'hidden'} lg:block w-full lg:w-64 flex-shrink-0`}>
              <Card className="sticky top-24">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Icon name="Filter" size={20} />
                      Фильтры
                    </CardTitle>
                    {activeFiltersCount > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="text-xs text-accent hover:text-accent"
                      >
                        Сбросить
                      </Button>
                    )}
                  </div>
                  {activeFiltersCount > 0 && (
                    <p className="text-xs text-muted-foreground">
                      Активно: {activeFiltersCount}
                    </p>
                  )}
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Subject Filter */}
                  <div>
                    <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                      <Icon name="BookOpen" size={16} />
                      Предметы
                    </h3>
                    <div className="space-y-2">
                      {subjects.map((subject) => (
                        <div key={subject} className="flex items-center space-x-2">
                          <Checkbox
                            id={`subject-${subject}`}
                            checked={selectedSubjects.includes(subject)}
                            onCheckedChange={() => toggleSubject(subject)}
                          />
                          <Label
                            htmlFor={`subject-${subject}`}
                            className="text-sm cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {subject}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Grade Filter */}
                  <div>
                    <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
                      <Icon name="GraduationCap" size={16} />
                      Классы
                    </h3>
                    <div className="space-y-2">
                      {grades.map((grade) => (
                        <div key={grade} className="flex items-center space-x-2">
                          <Checkbox
                            id={`grade-${grade}`}
                            checked={selectedGrades.includes(grade)}
                            onCheckedChange={() => toggleGrade(grade)}
                          />
                          <Label
                            htmlFor={`grade-${grade}`}
                            className="text-sm cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {grade}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1">
              {/* Mobile Filter Toggle */}
              <div className="lg:hidden mb-4">
                <Button
                  variant="outline"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="w-full"
                >
                  <Icon name="Filter" size={16} className="mr-2" />
                  {isSidebarOpen ? 'Скрыть фильтры' : 'Показать фильтры'}
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <div className="flex items-center justify-between mb-6">
                  <TabsList className="bg-secondary">
                    <TabsTrigger value="all" className="data-[state=active]:bg-white">
                      <Icon name="BookOpen" size={16} className="mr-2" />
                      Все работы
                    </TabsTrigger>
                    <TabsTrigger value="favorites" className="data-[state=active]:bg-white">
                      <Icon name="Heart" size={16} className="mr-2" />
                      Избранное ({assignments.filter(a => a.isFavorite).length})
                    </TabsTrigger>
                  </TabsList>
                  
                  <p className="text-sm text-muted-foreground">
                    Найдено: {filteredAssignments.length}
                  </p>
                </div>

                <TabsContent value={activeTab}>
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredAssignments.map((assignment) => (
                      <Card key={assignment.id} className="hover:shadow-lg transition-shadow border-2 hover:border-accent/50">
                        <CardHeader>
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <Badge variant="outline" className="text-xs">
                              {assignment.subject}
                            </Badge>
                            <button
                              onClick={() => toggleFavorite(assignment.id)}
                              className="text-muted-foreground hover:text-accent transition-colors"
                            >
                              <Icon
                                name="Heart"
                                size={20}
                                className={assignment.isFavorite ? 'fill-accent text-accent' : ''}
                              />
                            </button>
                          </div>
                          <CardTitle className="text-lg leading-tight">
                            {assignment.title}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-2 text-xs">
                            <Icon name="GraduationCap" size={14} />
                            {assignment.grade}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                            <span className="flex items-center gap-1">
                              <Icon name="FileText" size={16} />
                              {assignment.pages} стр.
                            </span>
                            <span className="flex items-center gap-1">
                              <Icon name="File" size={16} />
                              {assignment.format}
                            </span>
                          </div>
                          
                          {/* Rating Section */}
                          <div className="flex items-center justify-between mb-4 pb-3 border-b">
                            <div className="flex items-center gap-2">
                              {renderStars(assignment.rating, 14)}
                              <span className="text-sm font-semibold text-foreground">
                                {assignment.rating.toFixed(1)}
                              </span>
                            </div>
                            <button
                              onClick={() => openReviewDialog(assignment)}
                              className="text-xs text-accent hover:underline flex items-center gap-1"
                            >
                              <Icon name="MessageSquare" size={14} />
                              {assignment.reviewCount}
                            </button>
                          </div>

                          <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                            <Icon name="Download" size={16} className="mr-2" />
                            Скачать решение
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {filteredAssignments.length === 0 && (
                    <div className="text-center py-16">
                      <Icon name="SearchX" size={48} className="mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        Ничего не найдено
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Попробуйте изменить параметры поиска или фильтры
                      </p>
                      {activeFiltersCount > 0 && (
                        <Button variant="outline" onClick={clearFilters}>
                          Сбросить фильтры
                        </Button>
                      )}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-secondary py-12 border-y">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <div className="text-4xl font-bold text-accent mb-2">1500+</div>
              <p className="text-muted-foreground">Готовых решений</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">15</div>
              <p className="text-muted-foreground">Школьных предметов</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">98%</div>
              <p className="text-muted-foreground">Точность решений</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Icon name="GraduationCap" size={24} />
              <span className="font-semibold">ГДЗ Академия</span>
            </div>
            <p className="text-sm text-primary-foreground/80">
              © 2024 Все права защищены. Образовательная платформа
            </p>
          </div>
        </div>
      </footer>

      {/* Review Dialog */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {selectedAssignment?.title}
            </DialogTitle>
            <DialogDescription className="flex items-center gap-3">
              <Badge variant="outline">{selectedAssignment?.subject}</Badge>
              <span className="text-xs">{selectedAssignment?.grade}</span>
            </DialogDescription>
          </DialogHeader>

          {/* Overall Rating */}
          <div className="bg-secondary p-4 rounded-lg flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                {renderStars(selectedAssignment?.rating || 0, 20)}
                <span className="text-2xl font-bold text-foreground">
                  {selectedAssignment?.rating.toFixed(1)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {selectedAssignment?.reviewCount} отзывов
              </p>
            </div>
            <Button
              onClick={() => {
                const reviewForm = document.getElementById('review-form');
                reviewForm?.scrollIntoView({ behavior: 'smooth' });
              }}
              size="sm"
              variant="outline"
            >
              <Icon name="Plus" size={16} className="mr-2" />
              Оставить отзыв
            </Button>
          </div>

          {/* Existing Reviews */}
          <div className="space-y-4 mt-4">
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <Icon name="MessageSquare" size={16} />
              Отзывы студентов
            </h3>
            
            {selectedAssignment && selectedAssignment.reviews.length > 0 ? (
              <div className="space-y-3">
                {selectedAssignment.reviews.map((review) => (
                  <div key={review.id} className="border rounded-lg p-4 bg-card">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-accent text-accent-foreground text-xs">
                            {review.author.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">{review.author}</p>
                          <p className="text-xs text-muted-foreground">{review.date}</p>
                        </div>
                      </div>
                      {renderStars(review.rating, 14)}
                    </div>
                    <p className="text-sm text-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">
                Пока нет отзывов. Будьте первым!
              </p>
            )}
          </div>

          {/* Add Review Form */}
          <div id="review-form" className="border-t pt-4 mt-4">
            <h3 className="font-semibold text-sm mb-3">Ваш отзыв</h3>
            <div className="space-y-4">
              <div>
                <Label className="text-xs mb-2 block">Оценка</Label>
                <div className="flex items-center gap-2">
                  {renderStars(newReview.rating, 24, true, (rating) => 
                    setNewReview(prev => ({ ...prev, rating }))
                  )}
                  <span className="text-sm font-medium ml-2">{newReview.rating}.0</span>
                </div>
              </div>
              <div>
                <Label htmlFor="comment" className="text-xs mb-2 block">Комментарий</Label>
                <Textarea
                  id="comment"
                  placeholder="Поделитесь своим мнением о решении..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                  rows={4}
                  className="resize-none"
                />
              </div>
              <Button
                onClick={submitReview}
                disabled={!newReview.comment.trim()}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                <Icon name="Send" size={16} className="mr-2" />
                Отправить отзыв
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;