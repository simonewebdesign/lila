class Lila < Formula
  desc "The little load balancer"
  homepage "https://github.com/simonewebdesign/lila"
  url "https://github.com/simonewebdesign/lila/archive/0.1.0.tar.gz"
  sha256 "a896a452f188d00c81ead20996a518c5b8fd1aed7a9eed908e5728e421499e46"

  def install
    system "make", "install", "PREFIX=#{prefix}"
  end
end